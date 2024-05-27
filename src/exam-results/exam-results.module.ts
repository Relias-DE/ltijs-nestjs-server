import { Module } from '@nestjs/common';
import { ExamResultsService } from './exam-results.service';
import { ExamResultsController } from './exam-results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamResults } from './exam-results.entity';
import { ExamsModule } from '../exams/exams.module';
import { CustomerLearnerLicensesModule } from '../customer-learner-licenses/customer-learner-licenses.module';
import { CourseProgressesModule } from '../course-progresses/course-progresses.module';
import { CertificatesModule } from '../certificates/certificates.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamResults]),
    ExamsModule,
    CustomerLearnerLicensesModule,
    CourseProgressesModule,
    CertificatesModule,
  ],
  providers: [ExamResultsService],
  controllers: [ExamResultsController],
})
export class ExamResultsModule {}
