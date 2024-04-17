import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { Public } from '@app/common/lib/auth.guard';
import { CreateExerciseDto } from 'apps/workouts/src/dto/create-exercise.dto';
import { CreateWorkoutDto } from 'apps/workouts/src/dto/create-workout.dto';
import { CreateWorkoutLogDto } from 'apps/workouts/src/dto/create-workout-log.dto';
import { ObjectId } from 'mongoose';
import { ValidateObjectIdPipe } from '@app/common/lib/validate-objectid-pipe';

@Public() //TODO: Remove this line to make this endpoint private
@Controller('workouts')
export class WorkoutsController {
  constructor(
    private readonly gatewayService: GatewayService,
    @Inject('WORKOUTS_SERVICE') private readonly workoutsClient: ClientProxy,
  ) {}

  @Post('create-exercise')
  async createExercise(
    @Body() createExerciseDto: CreateExerciseDto,
  ): Promise<any> {
    return this.workoutsClient.send(
      { cmd: 'createExercise' },
      createExerciseDto,
    );
  }

  @Get('exercises')
  async getExercises(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: string = '',
  ): Promise<any> {
    return this.workoutsClient.send(
      { cmd: 'getExercises' },
      { page, limit, filter },
    );
  }

  @Post('create-workout')
  async createWorkout(
    @Body() createWorkoutDto: CreateWorkoutDto,
  ): Promise<any> {
    return this.workoutsClient.send({ cmd: 'createWorkout' }, createWorkoutDto);
  }

  @Get('workouts')
  async getWorkouts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: string = '',
  ): Promise<any> {
    return this.workoutsClient.send(
      { cmd: 'getWorkouts' },
      { page, limit, filter },
    );
  }

  @Get('workout/:id')
  async getWorkoutById(
    @Param('id', new ValidateObjectIdPipe()) id: ObjectId,
  ): Promise<any> {
    return this.workoutsClient.send({ cmd: 'getWorkoutById' }, id);
  }

  @Post('save-workout')
  async saveWorkout(@Body() workout: CreateWorkoutLogDto): Promise<any> {
    return this.workoutsClient.send({ cmd: 'saveWorkout' }, workout);
  }

  @Get('workout-logs')
  async getWorkoutLogs(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortOrder') sortOrder: string = 'desc',
  ): Promise<any> {
    return this.workoutsClient.send(
      { cmd: 'getWorkoutLogs' },
      { page, limit, sortOrder },
    );
  }
}
