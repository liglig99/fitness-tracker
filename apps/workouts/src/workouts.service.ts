import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Exercise, ExerciseDocument } from './entities/exercise.schema';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { PaginatedResult } from '@app/common/lib/paginated-result';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { Workout, WorkoutDocument } from './entities/workout.schema';
import { WorkoutLog, WorkoutLogDocument } from './entities/workout-log-schema';
import { CreateWorkoutLogDto } from './dto/create-workout-log.dto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectModel(Exercise.name)
    private exerciseModel: Model<ExerciseDocument>,
    @InjectModel(Workout.name)
    private workoutModel: Model<WorkoutDocument>,
    @InjectModel(WorkoutLog.name)
    private workoutLogModel: Model<WorkoutLogDocument>,
  ) {}
  async createExercise(createExerciseDto: CreateExerciseDto): Promise<any> {
    const createdExercise = new this.exerciseModel(createExerciseDto);

    try {
      return await createdExercise.save();
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getExercises({
    page,
    limit,
    filter = '',
  }): Promise<PaginatedResult<Exercise>> {
    const skip = (page - 1) * limit;

    const data = await this.exerciseModel
      .find({ name: { $regex: filter, $options: 'i' } })
      .skip(skip)
      .limit(limit)
      .exec();
    const totalCount = await this.exerciseModel
      .countDocuments({ name: { $regex: filter, $options: 'i' } })
      .exec();

    return {
      data,
      page,
      limit,
      totalCount,
    };
  }

  async createWorkout(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    try {
      const exercises = [];

      for (const exerciseDto of createWorkoutDto.exercises) {
        const exercise = new this.exerciseModel({
          name: exerciseDto.exercise,
        });
        await exercise.save(); //TODO: check if exercises already exist. Do we want to assume that they exist and expect an id here?
        exercises.push({
          exercise: exercise._id,
          sets: exerciseDto.sets,
          reps: exerciseDto.reps,
        });
      }

      const createdWorkout = new this.workoutModel({
        ...createWorkoutDto,
        exercises: exercises,
      });

      return await createdWorkout.save();
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getWorkouts({
    page,
    limit,
    filter = '',
  }): Promise<PaginatedResult<Workout>> {
    const skip = (page - 1) * limit;

    const data = await this.workoutModel
      .find({ name: { $regex: filter, $options: 'i' } })
      .skip(skip)
      .limit(limit)
      .exec();
    const totalCount = await this.workoutModel
      .countDocuments({ name: { $regex: filter, $options: 'i' } })
      .exec();

    return {
      data,
      page,
      limit,
      totalCount,
    };
  }

  async getWorkoutById(id: string): Promise<Workout> {
    const workout = await this.workoutModel
      .findById(id)
      .populate('exercises.exercise')
      .exec();

    if (!workout) {
      throw new RpcException(new NotFoundException('Workout not found'));
    }
    return workout;
  }

  async saveWorkout(workout: CreateWorkoutLogDto): Promise<WorkoutLog> {
    const createdWorkoutLog = new this.workoutLogModel(workout);

    try {
      return await createdWorkoutLog.save();
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getWorkoutLogs({
    page,
    limit,
    sortOrder,
  }): Promise<PaginatedResult<WorkoutLog>> {
    const skip = (page - 1) * limit;
    const sort = sortOrder === 'asc' ? 1 : -1;

    const data = await this.workoutLogModel
      .find()
      .sort({ endTime: sort })
      .skip(skip)
      .limit(limit)
      .exec();
    const totalCount = await this.workoutLogModel.countDocuments().exec();

    return {
      data,
      page,
      limit,
      totalCount,
    };
  }
}
