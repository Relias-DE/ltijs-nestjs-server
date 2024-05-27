import { Injectable } from '@nestjs/common';
import { Courses } from './courses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Courses)
    private readonly courses: Repository<Courses>,
  ) {}
  getCourse(courseId: number, clientId: string) {
    return this.courses.findOne({
      where: {
        id: courseId,
        coursesAssignedToCustomer: {
          isEnabled: true,
          customer: { ltiV3ClientId: clientId },
        },
      },
    });
  }

  getAllCourses() {
    return this.courses.find();
  }
}
