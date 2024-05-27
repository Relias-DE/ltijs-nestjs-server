import { Injectable } from '@nestjs/common';
import { ExamQuestions } from './exam-questions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExamQuestionsService {
  constructor(
    @InjectRepository(ExamQuestions)
    private readonly examQuestions: Repository<ExamQuestions>,
  ) {}
  async getExamQuestion(examQuestionId: number) {
    return await this.examQuestions.findOne({ where: { id: examQuestionId } });
  }
}
