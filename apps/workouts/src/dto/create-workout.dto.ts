import { Type } from 'class-transformer';
import { IsInt, IsString, ValidateNested } from 'class-validator';

class WorkoutExerciseDto {
  @IsString()
  exercise: string;

  @IsInt()
  sets: number;

  @IsInt()
  reps: number;
}

export class CreateWorkoutDto {
  @IsString()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => WorkoutExerciseDto)
  exercises: WorkoutExerciseDto[];
}
