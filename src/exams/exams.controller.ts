import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { Request, Response } from 'express';
import { Token } from 'src/lti-data-types';

@Controller('lti/exams')
export class ExamsController {
  constructor(private readonly exams: ExamsService) {}
  @Get('/:courseId')
  async getExamsByCourseId(
    @Req() req: Request,
    @Param('courseId') courseId: number,
    @Res() res: Response,
  ) {
    const token = res.locals.token as Token;
    const exams = await this.exams.getExamsByCourseId(
      courseId,
      token.userInfo.email,
      token.clientId,
    );
    res.json(exams);
  }
}
