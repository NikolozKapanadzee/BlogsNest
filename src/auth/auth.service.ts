import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';
import { signUpDTO } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { signInDTO } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async signUp({ email, password, username }: signUpDTO) {
    const existUser = await this.userModel.findOne({ email });
    if (existUser) {
      throw new BadRequestException('User already exists');
    }
    const existUsername = await this.userModel.findOne({ username });
    if (existUsername) {
      throw new BadRequestException('Username is taken');
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({
      email,
      password: hashedPass,
      username,
    });
    const userWithoutPassword = await this.userModel
      .findById(newUser._id)
      .select('-password');

    return {
      message: 'user registered successfully',
      user: userWithoutPassword,
    };
  }
  async signIn({ email, password }: signInDTO) {
    const existUser = await this.userModel
      .findOne({ email })
      .select('password');
    if (!existUser) {
      throw new BadRequestException('user does not exist');
    }
    const isPassEqual = await bcrypt.compare(password, existUser.password);
    if (!isPassEqual) {
      throw new BadRequestException('invalid credentials');
    }
    const payload = {
      id: existUser._id,
    };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    return {
      token,
    };
  }
  async getCurrentUser(userId) {
    const user = await this.userModel.findById(userId);
    return user;
  }
}
