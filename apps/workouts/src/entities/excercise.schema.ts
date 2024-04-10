import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExcerciseDocument = HydratedDocument<Excercise>;

@Schema()
export class Excercise {
  @Prop()
  name: string;
}

export const ExcerciseSchema = SchemaFactory.createForClass(Excercise);
