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
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { IsAuthGuard } from 'src/guards/IsAuthGuard.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'The mongo Id if the user',
    example: '6910e15a761f477e31625328',
  })
  @ApiOkResponse({
    description: 'User found successfully',
    schema: {
      example: {
        _id: '6910e15a761f477e31625328',
        email: 'nikolozkapanadze@gmail.com',
        username: 'nacarkekia',
        blogs: [],
        comments: [],
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
      userNotFound: {
        summary: 'User can not be found',
        value: {
          statusCode: 400,
          message: 'User Not Found',
          error: 'Bad Request',
        },
      },
    },
  })
  @Get(':id')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'The mongo Id if the user',
    example: '6910e15a761f477e31625328',
  })
  @ApiResponse({
    status: 201,
    schema: {
      example: 'User Updated Successfully',
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
      userNotFound: {
        summary: 'User can not be found',
        value: {
          statusCode: 400,
          message: 'User Not Found',
          error: 'Bad Request',
        },
      },
    },
  })
  @Patch(':id')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'The mongo Id if the user',
    example: '6910e15a761f477e31625328',
  })
  @ApiResponse({
    status: 201,
    schema: {
      example: 'User Deleted Successfully',
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
      userNotFound: {
        summary: 'User can not be found',
        value: {
          statusCode: 400,
          message: 'User Not Found',
          error: 'Bad Request',
        },
      },
    },
  })
  @Delete(':id')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
