import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Blog } from 'src/blogs/schema/blog.schema';

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
    ref: 'blog',
    default: [],
  })
  blogs: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
