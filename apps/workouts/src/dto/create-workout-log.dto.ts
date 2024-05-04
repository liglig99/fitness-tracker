import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsString, ValidateNested } from 'class-validator';

class WorkoutLogExerciseDto {
  @IsString()
  exercise: string;

  @IsInt()
  sets: number;

  @IsInt()
  reps: number;

  @IsInt()
  weight: number;
}

export class CreateWorkoutLogDto {
  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;

  @ValidateNested({ each: true })
  @Type(() => WorkoutLogExerciseDto)
  exercises: WorkoutLogExerciseDto[];
}
