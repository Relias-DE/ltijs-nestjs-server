import { Controller, Get, Param, Res } from '@nestjs/common';
import { ExamQuestionResponsesService } from './exam-question-responses.service';
import { Response } from 'express';

@Controller('lti/exam-question-responses')
export class ExamQuestionResponsesController {
  constructor(private examQuestionResponses: ExamQuestionResponsesService) {}
  @Get('/:examQuestionId')
  async getExamQuestionResponsesByExamQuestionId(
    @Res() res: Response,
    @Param('examQuestionId') examQuestionId: number,
  ) {
    const examQuestionResponses =
      await this.examQuestionResponses.getExamQuestionResponsesByExamQuestionId(
        examQuestionId,
      );
    res.json(examQuestionResponses);
  }
}
