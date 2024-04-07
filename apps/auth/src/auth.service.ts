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
import { randomUUID } from 'crypto';
import { jwtConstants } from './auth.constants';

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
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findOne(username);

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new RpcException(new UnauthorizedException());
    }
    return {
      access_token: await this.createAccessToken(user.username, user._id),
      refresh_token: await this.createRefreshToken(user.username),
    };
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ user: User; access_token: string; refresh_token: string }> {
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

      return {
        user: savedUser,
        access_token: await this.createAccessToken(
          savedUser.username,
          savedUser._id,
        ),
        refresh_token: await this.createRefreshToken(savedUser.username),
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

  async createRefreshToken(username: string) {
    const tokenId = randomUUID();
    return await this.jwtService.signAsync(
      { username: username, tokenId: tokenId },
      { expiresIn: '7d', secret: jwtConstants.refreshSecret },
    );
  }

  async createAccessToken(username: string, userId: unknown) {
    return await this.jwtService.signAsync({
      username: username,
      userId: userId,
    });
  }

  async refresh(
    refreshToken: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });
      const user = await this.userModel.findOne({ username: payload.username });
      if (!user) {
        throw new RpcException(new UnauthorizedException());
      }

      return {
        access_token: await this.createAccessToken(user.username, user._id),
        refresh_token: await this.createRefreshToken(user.username),
      };
    } catch (error) {
      throw new RpcException(new UnauthorizedException('Invalid token'));
    }
  }
}
