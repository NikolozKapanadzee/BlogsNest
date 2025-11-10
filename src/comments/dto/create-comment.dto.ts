import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'My Very First Comment' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
