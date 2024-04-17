import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Exercise } from './exercise.schema';

export type WorkoutDocument = HydratedDocument<Workout>;

@Schema()
export class Workout {
  @Prop()
  name: string;

  @Prop({
    type: [
      {
        exercise: { type: Types.ObjectId, ref: 'Exercise' },
        sets: Number,
        reps: Number,
      },
    ],
  })
  exercises: {
    exercise: Types.ObjectId | Exercise;
    sets: number;
    reps: number;
  }[];
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
