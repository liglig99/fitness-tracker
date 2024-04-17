import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Exercise } from './exercise.schema';
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
        exercise: { type: Types.ObjectId, ref: 'Exercise' },
        sets: Number,
        reps: Number,
        weight: Number,
      },
    ],
  })
  exercises: {
    exercise: Types.ObjectId | Exercise;
    sets: number;
    reps: number;
    weight: number;
  }[];

  @Prop({ type: Types.ObjectId, ref: 'Workout' })
  workout: Types.ObjectId | Workout;
}

export const WorkoutLogSchema = SchemaFactory.createForClass(WorkoutLog);
