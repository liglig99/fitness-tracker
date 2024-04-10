import { IsString } from 'class-validator';

export class CreateExcerciseDto {
  @IsString()
  name: string;
}
