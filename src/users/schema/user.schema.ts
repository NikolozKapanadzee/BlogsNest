import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Blog } from 'src/blogs/schema/blog.schema';
import { Comment } from 'src/comments/schema/comments.schema';

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  })
  email: string;
  @Prop({
    type: String,
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: 'Blog',
    default: [],
  })
  blogs: mongoose.Types.ObjectId[];

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: 'Comment',
    default: [],
  })
  comment: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
