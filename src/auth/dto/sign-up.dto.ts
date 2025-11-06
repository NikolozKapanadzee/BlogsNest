import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class signUpDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;
  @IsNotEmpty()
  @IsString()
  username: string;
}
