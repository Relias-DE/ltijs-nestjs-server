import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exams } from './exams.entity';
import { Repository } from 'typeorm';
import { CoursesService } from '../courses/courses.service';
import { CourseProgressesService } from '../course-progresses/course-progresses.service';
import { generateBadRequestException } from '../common/common.exceptions';
import { CourseProgressState } from '../course-progresses/course-progress.enum';
import { ApplicationErrors } from '../http-error-handler/errors.enum';

@Injectable()
export class ExamsService {
  private logger = new Logger('ExamsService');
  constructor(
    @InjectRepository(Exams)
    private readonly exams: Repository<Exams>,
    private readonly courses: CoursesService,
    private readonly courseProgresses: CourseProgressesService,
  ) {}

  async getOne(id: number) {
    return await this.exams.findOne({ where: { id } });
  }

  async getExamsByCourseId(
    courseId: number,
    learnerEmail: string,
    clientId: string,
  ) {
    const course = await this.courses.getCourse(courseId, clientId);
    const courseProgress = await this.courseProgresses.getCourseProgressForUser(
      learnerEmail,
      courseId,
      clientId,
    );
    if (courseProgress.state === CourseProgressState.FINISHEDWATCHING)
      return await this.exams.findOne({
        where: { course: course },
        relations: [
          'course',
          'examQuestions',
          'examQuestions.examQuestionReponses',
        ],
      });
    else {
      this.logger.error(
        ApplicationErrors.USER_HASNT_FINISHED_WATCHING_THE_COURSE,
      );
      throw generateBadRequestException(
        ApplicationErrors.USER_HASNT_FINISHED_WATCHING_THE_COURSE,
      );
    }
  }

  async getExamsWithQuestionsAndAnswers(id: number) {
    return await this.exams
      .createQueryBuilder('exams')
      .leftJoinAndSelect('exams.course', 'course')
      .leftJoinAndSelect('exams.examQuestions', 'examQuestions')
      .leftJoinAndSelect(
        'examQuestions.examQuestionReponses',
        'examQuestionReponses',
      )
      .where('course.id = :value', { value: id })
      .getOne();
  }
}
