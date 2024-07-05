import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Excercise } from './excercise.schema';

export type WorkoutDocument = HydratedDocument<Workout>;

@Schema()
export class Workout {
  @Prop()
  name: string;

  @Prop({
    type: [
      {
        excercise: { type: Types.ObjectId, ref: 'Excercise' },
        sets: Number,
        reps: Number,
      },
    ],
  })
  excercises: {
    excercise: Types.ObjectId | Excercise;
    sets: number;
    reps: number;
  }[];
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
