import { Controller } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Exercise } from './entities/exercise.schema';
import { PaginatedResult } from '@app/common/lib/paginated-result';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { Workout } from './entities/workout.schema';
import { WorkoutLog } from './entities/workout-log-schema';
import { CreateWorkoutLogDto } from './dto/create-workout-log.dto';

@Controller()
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @MessagePattern({ cmd: 'createExercise' })
  async createExercise(
    createExerciseDto: CreateExerciseDto,
  ): Promise<Exercise> {
    return this.workoutsService
      .createExercise(createExerciseDto)
      .then((result) => result);
  }

  @MessagePattern({ cmd: 'getExercises' })
  async getExercises({
    page,
    limit,
    filter,
  }): Promise<PaginatedResult<Exercise>> {
    return this.workoutsService.getExercises({ page, limit, filter });
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

  @MessagePattern({ cmd: 'getWorkoutById' })
  async getWorkoutById(id: string): Promise<Workout> {
    return this.workoutsService.getWorkoutById(id);
  }

  @MessagePattern({ cmd: 'saveWorkout' })
  async saveWorkout(workout: CreateWorkoutLogDto): Promise<WorkoutLog> {
    return this.workoutsService.saveWorkout(workout);
  }

  @MessagePattern({ cmd: 'getWorkoutLogs' })
  async getWorkoutLogs({
    page,
    limit,
    sortOrder,
  }): Promise<PaginatedResult<WorkoutLog>> {
    return this.workoutsService.getWorkoutLogs({ page, limit, sortOrder });
  }
}
