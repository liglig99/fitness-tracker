import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutSchema } from './entities/workout.schema';
import { ExcerciseSchema } from './entities/excercise.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:secret@mongodb/workouts?authSource=admin',
    ),
    MongooseModule.forFeature([
      { name: 'Workout', schema: WorkoutSchema },
      { name: 'Excercise', schema: ExcerciseSchema },
    ]),
  ],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
})
export class WorkoutsModule {}
