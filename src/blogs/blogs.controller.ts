import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './schema/blog.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { IsAuthGuard } from 'src/guards/IsAuthGuard.guard';
import { UserId } from 'src/decorators/user.decorator';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  @UseGuards(IsAuthGuard)
  @Post()
  create(@Body() createBlogDto: CreateBlogDto, @UserId() userId) {
    return this.blogsService.create(createBlogDto, userId);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @UseGuards(IsAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @UserId() userId: string,
  ) {
    return this.blogsService.update(id, updateBlogDto, userId);
  }

  @UseGuards(IsAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @UserId() userId: string) {
    return this.blogsService.remove(id, userId);
  }
}
