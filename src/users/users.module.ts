import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Blog, BlogSchema } from 'src/blogs/schema/blog.schema';
import { Comment, CommentSchema } from 'src/comments/schema/comments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: UserSchema, name: User.name },
      { schema: BlogSchema, name: Blog.name },
      { schema: CommentSchema, name: Comment.name },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
