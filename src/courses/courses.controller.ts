import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Request, Response } from 'express';
import { Token } from 'src/lti-data-types';

@Controller('lti/courses')
export class CoursesController {
  private readonly logger = new Logger(CoursesController.name);
  constructor(private courseService: CoursesService) {}

  @Get('/:id')
  async getCourse(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    this.logger.log(`Getting course-id (${id})`);
    const token = res.locals.token as Token;
    const course = await this.courseService.getCourse(id, token.clientId);
    if (!course) {
      this.logger.error('Course not found or not enabled for customer');
      throw new HttpException(
        'Course not found or not enabled for customer',
        HttpStatus.UNAUTHORIZED,
      );
    }
    res.json(course);
  }
}
