import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PlatformsModule } from './platforms/platforms.module';
import { CoursesModule } from './courses/courses.module';
import { CoursesAssignedToCustomerModule } from './courses-assigned-to-customer/courses-assigned-to-customer.module';
import { DatabaseModule } from './database.module';
import { CustomersModule } from './customers/customers.module';
import { CustomerLearnerLicensesModule } from './customer-learner-licenses/customer-learner-licenses.module';
import { CourseProgressesModule } from './course-progresses/course-progresses.module';
import { ExamsModule } from './exams/exams.module';
import { CertificatesModule } from './certificates/certificates.module';
import { ExamQuestionResponsesModule } from './exam-question-responses/exam-question-responses.module';
import { ExamResultsModule } from './exam-results/exam-results.module';
import { ExamQuestionsModule } from './exam-questions/exam-questions.module';
import { DeepLinkingModule } from './deep-linking/deep-linking.module';
import { ApiAuthModule } from './api-auth/api-auth.module';
import { GradesModule } from './grades/grades.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'public'),
      exclude: ['/lti/(.*)', '/api/(.*)'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PlatformsModule,
    CoursesModule,
    CoursesAssignedToCustomerModule,
    DatabaseModule,
    CustomersModule,
    CustomerLearnerLicensesModule,
    CoursesModule,
    CourseProgressesModule,
    ExamsModule,
    CertificatesModule,
    CoursesAssignedToCustomerModule,
    ExamQuestionResponsesModule,
    ExamResultsModule,
    ExamQuestionsModule,
    DeepLinkingModule,
    ApiAuthModule,
    GradesModule,
  ],
})
export class AppModule {}
