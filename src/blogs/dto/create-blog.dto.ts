import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title?: string;
  @IsString()
  @IsNotEmpty()
  content: string;
}
