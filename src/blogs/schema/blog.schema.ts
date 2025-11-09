import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Blog {
  @Prop({
    type: String,
    required: false,
  })
  title: string;
  @Prop({
    type: String,
  })
  content: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  author: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: 'Comment',
    default: [],
  })
  comments: mongoose.Types.ObjectId[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
