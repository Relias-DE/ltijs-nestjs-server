import { Body, Controller, Param, Post, Req, Res } from '@nestjs/common';
import { ExamResultsService } from './exam-results.service';
import { ExamResultsDto } from './dtos/exam-results.dto';
import { Request, Response } from 'express';
import { Token } from 'src/lti-data-types';

@Controller('lti/exam-results')
export class ExamResultsController {
  constructor(private examResults: ExamResultsService) {}
  @Post('/:courseId')
  async createExamResult(
    @Req() req: Request,
    @Param('courseId') courseId: number,
    @Body() examResultDto: ExamResultsDto[],
    @Res() res: Response,
  ) {
    const token = res.locals.token as Token;
    const createdExamResult = await this.examResults.createExamResult(
      token.userInfo.email,
      courseId,
      examResultDto,
      token.clientId,
    );
    res.json(createdExamResult);
  }
}
