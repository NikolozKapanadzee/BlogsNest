import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class signInDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;
}
