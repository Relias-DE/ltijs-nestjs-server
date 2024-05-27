import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamQuestionResponses } from './exam-question-responses.entity';
import { Repository } from 'typeorm';
import { ExamQuestionsService } from '../exam-questions/exam-questions.service';

@Injectable()
export class ExamQuestionResponsesService {
  constructor(
    @InjectRepository(ExamQuestionResponses)
    private readonly examQuesionResponses: Repository<ExamQuestionResponses>,
    private readonly examQuestions: ExamQuestionsService,
  ) {}
  async getExamQuestionResponsesByExamQuestionId(examQuestionId: number) {
    const examQuestion =
      await this.examQuestions.getExamQuestion(examQuestionId);
    return await this.examQuesionResponses.find({ where: { examQuestion } });
  }
}
