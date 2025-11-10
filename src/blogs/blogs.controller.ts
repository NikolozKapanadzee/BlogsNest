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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  @ApiResponse({
    status: 201,
    schema: {
      example: 'Blog Created Successfully',
    },
  })
  @Post()
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  create(@Body() createBlogDto: CreateBlogDto, @UserId() userId) {
    return this.blogsService.create(createBlogDto, userId);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'The mongo Id if the blog',
    example: '6910e4417d38440e8480c45a',
  })
  @ApiOkResponse({
    description: 'Blog found successfully',
    schema: {
      example: {
        _id: '6910e4417d38440e8480c45a',
        title: 'Industrial Revolution',
        content:
          'The Industrial Revolution and its consequences have been a disaster for the human race.',
        author: '65f05fbc42f4f4163f73c8a2',
        createdAt: '2025-11-10T18:22:30.123Z',
        updatedAt: '2025-11-10T18:22:30.123Z',
      },
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
      blogNotFound: {
        summary: 'Blog can not be found',
        value: {
          statusCode: 400,
          message: 'Blog Not Found',
          error: 'Bad Request',
        },
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'The mongo Id if the blog',
    example: '6910e4417d38440e8480c45a',
  })
  @ApiResponse({
    status: 201,
    schema: {
      example: 'Blog has been updated',
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
      blogNotFound: {
        summary: 'Blog can not be found',
        value: {
          statusCode: 400,
          message: 'Blog Not Found',
          error: 'Bad Request',
        },
      },
      userTriesToDeleteOthersBlog: {
        summary: 'User tries to delete others blog',
        value: {
          statusCode: 400,
          message: 'You have not permition to update that blog',
          error: 'Bad Request',
        },
      },
    },
  })
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @UserId() userId: string,
  ) {
    return this.blogsService.update(id, updateBlogDto, userId);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'The mongo Id if the blog',
    example: '6910e4417d38440e8480c45a',
  })
  @ApiResponse({
    status: 201,
    schema: {
      example: 'Blog has been deleted',
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
      blogNotFound: {
        summary: 'Blog can not be found',
        value: {
          statusCode: 400,
          message: 'Blog Not Found',
          error: 'Bad Request',
        },
      },
      userTriesToDeleteOthersBlog: {
        summary: 'User tries to delete others blog',
        value: {
          statusCode: 400,
          message: 'You have not permition to update that blog',
          error: 'Bad Request',
        },
      },
    },
  })
  @Delete(':id')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string, @UserId() userId: string) {
    return this.blogsService.remove(id, userId);
  }
}
