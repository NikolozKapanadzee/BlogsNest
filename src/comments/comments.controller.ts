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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiResponse({
    status: 201,
    schema: {
      example: 'comment Created Successfully',
    },
  })
  @Post(':blogId')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
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

  @ApiParam({
    name: 'id',
    type: String,
    description: 'The mongo Id if the comment',
    example: '6912367c0301f99a395f8f05',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    examples: {
      invalidMongoId: {
        summary: 'invalid mongo ID',
        value: {
          statusCode: 400,
          message: 'Invalid ID format',
          error: 'Bad Request',
        },
      },
      commentNotFound: {
        summary: 'comment can not be found',
        value: {
          statusCode: 400,
          message: 'Comment Not Found',
          error: 'Bad Request',
        },
      },
    },
  })
  @Get(':id')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'The mongo Id if the comment',
    example: '6912367c0301f99a395f8f05',
  })
  @ApiResponse({
    status: 201,
    schema: {
      example: 'Comment has been updated',
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    examples: {
      invalidMongoId: {
        summary: 'invalid mongo ID',
        value: {
          statusCode: 400,
          message: 'Invalid ID format',
          error: 'Bad Request',
        },
      },
      commentNotFound: {
        summary: 'Comment can not be found',
        value: {
          statusCode: 400,
          message: 'Comment Not Found',
          error: 'Bad Request',
        },
      },
      userTriesToDeleteOthersComment: {
        summary: 'User tries to delete others comment',
        value: {
          statusCode: 400,
          message: 'You have not permition to update that comment',
          error: 'Bad Request',
        },
      },
    },
  })
  @Patch(':id')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @UserId() userId: string,
  ) {
    return this.commentsService.update(id, updateCommentDto, userId);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'The mongo Id if the comment',
    example: '6912367c0301f99a395f8f05',
  })
  @ApiResponse({
    status: 201,
    schema: {
      example: 'Comment has been deleted',
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    examples: {
      invalidMongoId: {
        summary: 'invalid mongo ID',
        value: {
          statusCode: 400,
          message: 'Invalid ID format',
          error: 'Bad Request',
        },
      },
      commentNotFound: {
        summary: 'Comment can not be found',
        value: {
          statusCode: 400,
          message: 'Comment Not Found',
          error: 'Bad Request',
        },
      },
      notFoundAssociatedBlog: {
        summary: 'Associated Blog to that user can not be found',
        value: {
          statusCode: 400,
          message: 'Associated blog not found',
          error: 'Bad Request',
        },
      },
      userTriesToDeleteOthersComment: {
        summary: 'User tries to delete others comment',
        value: {
          statusCode: 400,
          message: 'You have not permition to update that comment',
          error: 'Bad Request',
        },
      },
    },
  })
  @Delete(':id')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string, @UserId() userId: string) {
    return this.commentsService.remove(id, userId);
  }
}
