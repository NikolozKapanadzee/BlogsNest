import { UserId } from 'src/decorators/user.decorator';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './schema/blog.schema';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/user.schema';
import { Comment } from 'src/comments/schema/comments.schema';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}
  async create(createBlogDto: CreateBlogDto, userId: string) {
    const { title, content } = createBlogDto;
    const newBlog = await this.blogModel.create({
      title,
      content,
      author: userId,
    });
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { blogs: newBlog._id },
    });
    return {
      message: 'Blog Created Successfully',
      blog: newBlog,
    };
  }

  async findAll() {
    return await this.blogModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const blog = await this.blogModel.findById(id);
    if (!blog) {
      throw new NotFoundException('Blog Not Found');
    }
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto, userId: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const blog = await this.blogModel.findById(id);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    if (blog.author.toString() !== userId.toString()) {
      throw new ForbiddenException(
        'You have not permition to update that blog',
      );
    }
    const updatedBlog = await this.blogModel.findByIdAndUpdate(
      id,
      updateBlogDto,
      {
        new: true,
        runValidators: true,
      },
    );
    return {
      message: 'Blog has been updated',
      blog: updatedBlog,
    };
  }

  async remove(id: string, userId) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const blog = await this.blogModel.findById(id);
    if (!blog) {
      throw new NotFoundException('Blog Not Found');
    }
    if (blog.author.toString() !== userId.toString()) {
      throw new ForbiddenException(
        'You have not permition to delete that blog',
      );
    }
    const deletedBlog = await this.blogModel.findByIdAndDelete(id);
    await this.userModel.findByIdAndUpdate(
      deletedBlog?.author,
      { $pull: { blogs: deletedBlog?._id } },
      { new: true },
    );
    await this.commentModel.deleteMany({ author: id });

    return {
      message: 'Blog has been deleted',
      blog: deletedBlog,
    };
  }
}
