import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform<string> {
  async transform(value: string) {
    if (!mongoose.isValidObjectId(value)) {
      throw new BadRequestException('Invalid ID!');
    }
    return value;
  }
}
