import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './users/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new RpcException(new UnauthorizedException());
    }
    const payload = { sub: user.email, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ user: User; access_token: string }> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      email: createUserDto.email,
      username: createUserDto.username,
      password: hashedPassword,
    });

    try {
      const savedUser = await createdUser.save();
      console.log('savedUser', savedUser);
      savedUser.password = undefined;

      const payload = {
        username: savedUser.username,
        pass: createUserDto.password,
      };
      const access_token = await this.jwtService.signAsync(payload);

      return {
        user: savedUser,
        access_token,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new RpcException(
          new BadRequestException('Username or email already exists'),
        );
      } else {
        throw new RpcException(
          new BadRequestException('Username or email already exists'),
        );
      }
    }
  }
}
