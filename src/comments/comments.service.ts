import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schema/comments.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { Blog } from 'src/blogs/schema/blog.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
  ) {}
  async create(
    createCommentDto: CreateCommentDto,
    blogId: string,
    userId: string,
  ) {
    const { content } = createCommentDto;
    const newComment = await this.commentModel.create({
      content,
      author: userId,
      blogId: blogId,
    });
    await this.blogModel.findByIdAndUpdate(blogId, {
      $push: { comment: newComment._id },
    });
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { comment: newComment._id },
    });
    return {
      message: 'comment created successfully',
      data: newComment,
    };
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
