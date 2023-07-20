import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDTO } from './dto/auth.dto';
import { User } from './entity/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, // private readonly userRepository: Repository<User>,
  ) // private readonly jwtService: JwtService,
  {}

  async signup(userCredential: SignUpDTO) {
    try {
      // userCredential.password = await hashedPassword(userCredential.password);
      const user = new this.userModel(userCredential);
      return user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User Already Exist');
      }
      throw new InternalServerErrorException();
    }
  }
}
