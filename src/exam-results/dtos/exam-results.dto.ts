import { IsNotEmpty } from 'class-validator';
export class ExamResultsDto {
  @IsNotEmpty()
  questionId: number;

  @IsNotEmpty()
  answerId: number;
}
