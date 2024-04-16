import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Excercise } from './excercise.schema';
import { Workout } from './workout.schema';

export type WorkoutLogDocument = HydratedDocument<WorkoutLog>;

@Schema()
export class WorkoutLog {
  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop({
    type: [
      {
        excercise: { type: Types.ObjectId, ref: 'Excercise' },
        sets: Number,
        reps: Number,
        weight: Number,
      },
    ],
  })
  exercises: {
    exercise: Types.ObjectId | Excercise;
    sets: number;
    reps: number;
    weight: number;
  }[];

  @Prop({ type: Types.ObjectId, ref: 'Workout' })
  workout: Types.ObjectId | Workout;
}

export const WorkoutLogSchema = SchemaFactory.createForClass(WorkoutLog);
