import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExamQuestionResponses } from '../exam-question-responses/exam-question-responses.entity';

import { Exams } from '../exams/exams.entity';

@Entity()
export class ExamQuestions {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional({ type: () => Exams, isArray: false })
  @ManyToOne(() => Exams, (exam) => exam.examQuestions, {
    onDelete: 'CASCADE',
  })
  exam: Exams;

  @ApiPropertyOptional({ type: () => ExamQuestionResponses, isArray: true })
  @OneToMany(
    () => ExamQuestionResponses,
    (examQuestionReponse) => examQuestionReponse.examQuestion,
  )
  examQuestionReponses: ExamQuestionResponses[];

  @ApiProperty()
  @Column()
  recordId: number;

  @ApiProperty()
  @Column()
  question: string;

  @ApiProperty()
  @Column({ nullable: true })
  questionOrder: number;

  @ApiProperty()
  @Column()
  correctResponseId: number;

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
