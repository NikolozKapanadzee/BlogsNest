import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { BlogId } from 'src/decorators/blog.decorator';
import { UserId } from 'src/decorators/user.decorator';
import { ParseMongoIdPipe } from 'src/pipes/parsedmongoid.pipe';
import { IsAuthGuard } from 'src/guards/IsAuthGuard.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':blogId')
  @UseGuards(IsAuthGuard)
  create(
    @Body() createCommentDto: CreateCommentDto,
    @BlogId(ParseMongoIdPipe) blogId: string,
    @UserId() userId: string,
  ) {
    console.log(userId, 'userId');
    console.log(blogId, 'blogId');
    return this.commentsService.create(createCommentDto, blogId, userId);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @UseGuards(IsAuthGuard)
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(IsAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @UserId() userId: string,
  ) {
    return this.commentsService.update(id, updateCommentDto, userId);
  }

  @Delete(':id')
  @UseGuards(IsAuthGuard)
  remove(@Param('id') id: string, @UserId() userId: string) {
    return this.commentsService.remove(id, userId);
  }
}
