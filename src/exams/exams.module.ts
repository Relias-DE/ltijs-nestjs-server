import { Module } from '@nestjs/common';
import { ExamsController } from './exams.controller';
import { ExamsService } from './exams.service';
import { CoursesModule } from '../courses/courses.module';
import { Exams } from './exams.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseProgressesModule } from '../course-progresses/course-progresses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exams]),
    CoursesModule,
    CourseProgressesModule,
  ],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [ExamsService],
})
export class ExamsModule {}
