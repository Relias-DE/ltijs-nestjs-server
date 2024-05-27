import { Injectable } from '@nestjs/common';
import { ExamResults } from './exam-results.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamResultsDto } from './dtos/exam-results.dto';
import { ExamsService } from '../exams/exams.service';
import { CustomerLearnerLicensesService } from '../customer-learner-licenses/customer-learner-licenses.service';
import { Exams } from '../exams/exams.entity';
import { differenceInDays } from 'date-fns';
import { generateBadRequestException } from '../common/common.exceptions';
import { CourseProgressesService } from '../course-progresses/course-progresses.service';
import { CourseProgressState } from '../course-progresses/course-progress.enum';
import { CertificatesService } from '../certificates/certificates.service';

@Injectable()
export class ExamResultsService {
  constructor(
    @InjectRepository(ExamResults)
    private readonly examResults: Repository<ExamResults>,
    private readonly exams: ExamsService,
    private readonly learners: CustomerLearnerLicensesService,
    private readonly courseProgressesService: CourseProgressesService,
    private readonly certificatesService: CertificatesService,
  ) {}
  async findLatestOne(learnerEmail) {
    const learner = await this.learners.getLearner(learnerEmail);
    return await this.examResults.findOne({
      where: { learner },
      order: { updatedAt: 'DESC' },
    });
  }
  async createExamResult(
    learnerEmail: string,
    courseId: number,
    examResultDto: ExamResultsDto[],
    clientId: string,
  ) {
    const exam: Exams =
      await this.exams.getExamsWithQuestionsAndAnswers(courseId);
    const history = await this.findLatestOne(learnerEmail);
    const learner = await this.learners.getLearner(learnerEmail);
    const alreadyPassedInLast24Hrs =
      history &&
      history.hasPassed &&
      differenceInDays(new Date(), history.updatedAt) < 1;
    if (alreadyPassedInLast24Hrs) {
      generateBadRequestException(
        'The user already passed this exam in the last 24 hours.',
      );
    }
    const questionsCount = exam.totalQuestions;
    if (questionsCount !== examResultDto.length)
      generateBadRequestException("Responses length doesn't match");
    const correctAnswers = examResultDto.reduce((correctAnswers, response) => {
      const question = exam.examQuestions.find(
        (question) => question.id === response.questionId,
      );
      const chosenAnswer = question.examQuestionReponses.find(
        (answer) => answer.id === response.answerId,
      );
      if (chosenAnswer.isCorrect) correctAnswers++;
      return correctAnswers;
    }, 0);
    const percentage = Math.floor((100 * correctAnswers) / questionsCount);
    const hasPassed = percentage >= 80 ? true : false;
    const newExamResult: Partial<ExamResults> = {
      resultPercentage: percentage,
      hasPassed,
      learner,
      exam,
      correctAnswers,
      questionsCount,
    };
    const createdExamResult = await this.examResults.save(newExamResult);
    if (hasPassed) {
      await this.courseProgressesService.updateCourseProgressForUser(
        learnerEmail,
        courseId,
        { state: CourseProgressState.COMPLETED, position: '' },
        clientId,
      );
      await this.certificatesService.create(learner, exam.course);
    }
    return this.examResults.findOne({
      where: { id: createdExamResult.id },
      relations: ['exam', 'exam.course'],
    });
  }
}
