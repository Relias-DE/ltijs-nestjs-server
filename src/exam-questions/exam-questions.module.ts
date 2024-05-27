import { Module } from '@nestjs/common';
import { ExamQuestionsService } from './exam-questions.service';
import { ExamQuestionsController } from './exam-questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamQuestions } from './exam-questions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamQuestions])],
  providers: [ExamQuestionsService],
  controllers: [ExamQuestionsController],
  exports: [ExamQuestionsService],
})
export class ExamQuestionsModule {}
