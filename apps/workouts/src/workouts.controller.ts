import { Controller } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { Excercise } from './entities/excercise.schema';
import { PaginatedResult } from '@app/common/lib/paginated-result';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { Workout } from './entities/workout.schema';

@Controller()
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @MessagePattern({ cmd: 'createExcercise' })
  async createExcercise(
    createExcerciseDto: CreateExcerciseDto,
  ): Promise<Excercise> {
    return this.workoutsService
      .createExcercise(createExcerciseDto)
      .then((result) => result);
  }

  @MessagePattern({ cmd: 'getExcercises' })
  async getExcercises({
    page,
    limit,
    filter,
  }): Promise<PaginatedResult<Excercise>> {
    return this.workoutsService.getExcercises({ page, limit, filter });
  }

  @MessagePattern({ cmd: 'createWorkout' })
  async createWorkout(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    return this.workoutsService.createWorkout(createWorkoutDto);
  }

  @MessagePattern({ cmd: 'getWorkouts' })
  async getWorkouts({
    page,
    limit,
    filter,
  }): Promise<PaginatedResult<Workout>> {
    return this.workoutsService.getWorkouts({ page, limit, filter });
  }
}
