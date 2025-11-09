import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

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
    ref: 'blog',
    default: [],
  })
  blogs: mongoose.Types.ObjectId[];

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: 'comment',
    default: [],
  })
  comment: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
