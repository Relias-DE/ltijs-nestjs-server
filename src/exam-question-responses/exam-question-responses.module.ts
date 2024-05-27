import { Module } from '@nestjs/common';
import { ExamQuestionResponsesService } from './exam-question-responses.service';
import { ExamQuestionResponsesController } from './exam-question-responses.controller';
import { ExamQuestionResponses } from './exam-question-responses.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamQuestionsModule } from '../exam-questions/exam-questions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamQuestionResponses]),
    ExamQuestionsModule,
  ],
  providers: [ExamQuestionResponsesService],
  controllers: [ExamQuestionResponsesController],
})
export class ExamQuestionResponsesModule {}
