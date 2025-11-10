import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class signInDTO {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ example: 'password123', minLength: 8, maxLength: 20 })
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;
}
