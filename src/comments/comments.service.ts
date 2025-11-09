import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schema/comments.schema';
import { isValidObjectId, Model } from 'mongoose';
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

  async findAll() {
    return this.commentModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const comment = await this.commentModel.findById(id);
    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const comment = await this.commentModel.findById(id);
    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    const updatedComment = await this.commentModel.findByIdAndUpdate(
      id,
      updateCommentDto,
      {
        new: true,
        runValidators: true,
      },
    );
    return {
      message: 'comment has been updated',
      data: updatedComment,
    };
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const comment = await this.commentModel.findById(id);
    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    const deletedComment = await this.commentModel.findByIdAndDelete(id);
    if (!deletedComment) {
      throw new NotFoundException('comment not found');
    }
    await this.blogModel.findByIdAndUpdate(
      deletedComment?.author,
      {
        $pull: { comment: deletedComment._id },
      },
      { new: true },
    );
    await this.userModel.findByIdAndUpdate(
      deletedComment?.author,
      {
        $pull: { comment: deletedComment._id },
      },
      { new: true },
    );
    return {
      message: 'comment has been deleted',
      data: deletedComment,
    };
  }
}
