import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Comment {
  @Prop({
    type: String,
  })
  content: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'blog',
  })
  blogId: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  })
  author: string;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
