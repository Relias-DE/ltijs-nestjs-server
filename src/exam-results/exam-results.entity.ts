import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exams } from '../exams/exams.entity';
import { CustomerLearnerLicenses } from '../customer-learner-licenses/customer-learner-licenses.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class ExamResults {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  resultPercentage: number;

  @ApiProperty()
  @Column({ nullable: true })
  correctAnswers: number;

  @ApiProperty()
  @Column()
  questionsCount: number;

  @ApiProperty()
  @Column()
  hasPassed: boolean;

  @ApiPropertyOptional({ type: () => CustomerLearnerLicenses, isArray: false })
  @ManyToOne(() => CustomerLearnerLicenses, (user) => user.results, {
    onDelete: 'CASCADE',
  })
  learner: CustomerLearnerLicenses;

  @ApiPropertyOptional({ type: () => Exams, isArray: false })
  @ManyToOne(() => Exams, (exam) => exam.results, { onDelete: 'CASCADE' })
  exam: Exams;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
