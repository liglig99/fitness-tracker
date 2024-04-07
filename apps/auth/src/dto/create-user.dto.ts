import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  // @IsStrongPassword()
  @IsNotEmpty()
  @IsString()
  password: string;
}
