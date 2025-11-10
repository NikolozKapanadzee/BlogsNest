import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDTO } from './dto/sign-up.dto';
import { signInDTO } from './dto/sign-in.dto';
import { IsAuthGuard } from 'src/guards/IsAuthGuard.guard';
import { UserId } from 'src/decorators/user.decorator';
import { ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiResponse({
    status: 201,
    schema: {
      example: 'user registered successfully',
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    examples: {
      userExists: {
        summary: 'User already exists',
        value: {
          statusCode: 400,
          message: 'User already exists',
          error: 'Bad Request',
        },
      },
      usernameTaken: {
        summary: 'Username is taken',
        value: {
          statusCode: 400,
          message: 'Username is taken',
          error: 'Bad Request',
        },
      },
    },
  })
  @Post('sign-up')
  signUp(@Body() signUpDto: signUpDTO) {
    return this.authService.signUp(signUpDto);
  }

  @ApiResponse({
    status: 201,
    schema: {
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTBlMTg4NzYxZjQ3N2UzMTYyNTMzNyIsImlhdCI6MTc2MjcxNTAzNSwiZXhwIjoxNzYyNzE4NjM1fQ.ZWIDwsow-DMaF76v1KQtL5HYIFbB0kk728cyyx6BNKw',
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    examples: {
      userDoesNotExists: {
        summary: 'User does not exists',
        value: {
          statusCode: 400,
          message: 'User does not exists',
          error: 'Bad Request',
        },
      },
      passIsNotEqual: {
        summary: 'password is not equal',
        value: {
          statusCode: 400,
          message: 'invalid credentials',
          error: 'Bad Request',
        },
      },
    },
  })
  @Post('sign-in')
  signIn(@Body() signInDto: signInDTO) {
    return this.authService.signIn(signInDto);
  }
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        _id: '69122a87577850cd8afcf12a',
        email: 'johndoe@gmail.com',
        username: 'berbelioti0',
        blogs: [],
        comments: [],
        createdAt: '2025-11-10T18:10:15.540Z',
        updatedAt: '2025-11-10T18:10:15.540Z',
        __v: 0,
      },
    },
  })
  @Get('current-user')
  @UseGuards(IsAuthGuard)
  getCurrentUser(@UserId() userId) {
    return this.authService.getCurrentUser(userId);
  }
}
