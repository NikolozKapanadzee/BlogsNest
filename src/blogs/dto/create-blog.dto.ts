import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ example: 'Industrial Revolution', required: false })
  @IsString()
  title?: string;
  @ApiProperty({
    example:
      'The Industrial Revolution and its consequences have been a disaster for the human race.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
