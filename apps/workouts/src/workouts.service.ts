import { Injectable } from '@nestjs/common';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Excercise, ExcerciseDocument } from './entities/excercise.schema';
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
    @InjectModel(Excercise.name)
    private excerciseModel: Model<ExcerciseDocument>,
    @InjectModel(Workout.name)
    private workoutModel: Model<WorkoutDocument>,
    @InjectModel(WorkoutLog.name)
    private workoutLogModel: Model<WorkoutLogDocument>,
  ) {}
  async createExcercise(createExcerciseDto: CreateExcerciseDto): Promise<any> {
    const createdExcercise = new this.excerciseModel(createExcerciseDto);

    try {
      return await createdExcercise.save();
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getExcercises({
    page,
    limit,
    filter = '',
  }): Promise<PaginatedResult<Excercise>> {
    const skip = (page - 1) * limit;

    const data = await this.excerciseModel
      .find({ name: { $regex: filter, $options: 'i' } })
      .skip(skip)
      .limit(limit)
      .exec();
    const totalCount = await this.excerciseModel
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
      const excercises = [];

      for (const excerciseDto of createWorkoutDto.excercises) {
        const excercise = new this.excerciseModel({
          name: excerciseDto.exercise,
        });
        await excercise.save(); //TODO: check if excercises already exist. Do we want to assume that they exist and expect an id here?
        excercises.push({
          excercise: excercise._id,
          sets: excerciseDto.sets,
          reps: excerciseDto.reps,
        });
      }

      const createdWorkout = new this.workoutModel({
        ...createWorkoutDto,
        excercises: excercises,
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
