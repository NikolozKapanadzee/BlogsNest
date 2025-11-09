import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Blog } from 'src/blogs/schema/blog.schema';
import { User } from 'src/users/schema/user.schema';

@Schema({ timestamps: true })
export class Comment {
  @Prop({
    type: String,
  })
  content: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Blog',
  })
  blogId: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  })
  author: string;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
