import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { Public } from '@app/common/lib/auth.guard';
import { CreateExcerciseDto } from 'apps/workouts/src/dto/create-excercise.dto';
import { CreateWorkoutDto } from 'apps/workouts/src/dto/create-workout.dto';

@Public() //TODO: Remove this line to make this endpoint private
@Controller('workouts')
export class WorkoutsController {
  constructor(
    private readonly gatewayService: GatewayService,
    @Inject('WORKOUTS_SERVICE') private readonly workoutsClient: ClientProxy,
  ) {}

  @Post('create-excercise')
  async createExcercise(
    @Body() createExcerciseDto: CreateExcerciseDto,
  ): Promise<any> {
    return this.workoutsClient.send(
      { cmd: 'createExcercise' },
      createExcerciseDto,
    );
  }

  @Get('excercises')
  async getExcercises(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter: string = '',
  ): Promise<any> {
    return this.workoutsClient.send(
      { cmd: 'getExcercises' },
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
}
