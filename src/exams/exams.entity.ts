/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Courses } from '../courses/courses.entity';
import { ExamQuestions } from '../exam-questions/exam-questions.entity';
import { ExamResults } from '../exam-results/exam-results.entity';

@Entity()
export class Exams {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Courses, (course) => course.exams)
  @JoinColumn()
  course: Courses;

  @ApiPropertyOptional({ type: () => ExamQuestions, isArray: true })
  @OneToMany((type) => ExamQuestions, (examQuestions) => examQuestions.exam)
  examQuestions: ExamQuestions[];

  @ApiPropertyOptional({ type: () => ExamResults, isArray: true })
  @OneToMany(() => ExamResults, (examResult) => examResult.exam)
  results: ExamResults[];

  @ApiProperty()
  @Column({ length: 100, nullable: true })
  moduleCode: string;

  @ApiProperty()
  @Column()
  recordId: number;

  @ApiProperty()
  @Column()
  moduleRecordId: number;

  @ApiProperty()
  @Column({ type: 'decimal' })
  masteryScore: number;

  @ApiProperty()
  @Column({ default: true })
  randomize: boolean;

  @ApiProperty()
  @Column()
  questionsPerPage: number;

  @ApiProperty()
  @Column()
  totalQuestions: number;

  @ApiProperty()
  @Column()
  countOfExamQuestions: number;

  @ApiProperty()
  @Column({ nullable: true })
  lastModifiedAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
