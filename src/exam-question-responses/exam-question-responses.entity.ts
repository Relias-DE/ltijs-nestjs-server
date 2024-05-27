import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExamQuestions } from '../exam-questions/exam-questions.entity';

@Entity()
export class ExamQuestionResponses {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional({ type: () => ExamQuestions, isArray: false })
  @ManyToOne(
    () => ExamQuestions,
    (examQuestion) => examQuestion.examQuestionReponses,
    { onDelete: 'CASCADE' },
  )
  examQuestion: ExamQuestions;

  @ApiProperty()
  @Column()
  recordId: number;

  @ApiProperty()
  @Column()
  response: string;

  @ApiProperty()
  @Column({ nullable: true })
  responseOrder: number;

  @ApiProperty()
  @Column({ default: false })
  isCorrect: boolean;

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
