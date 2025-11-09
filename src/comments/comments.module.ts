import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schema/comments.schema';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Blog, BlogSchema } from 'src/blogs/schema/blog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: CommentSchema, name: Comment.name },
      { schema: UserSchema, name: User.name },
      { schema: BlogSchema, name: Blog.name },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
