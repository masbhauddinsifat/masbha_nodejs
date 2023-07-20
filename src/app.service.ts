import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO, SignUpDTO } from './dto/auth.dto';
import { ExpenseDTO } from './dto/expense.dto';
import { Expense } from './entity/expense.entity';
import { User } from './entity/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Expense.name) private expenseModel: Model<Expense>, // private readonly userRepository: Repository<User>, // private readonly jwtService: JwtService,
  ) {}

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

  async signin(userCredential: LoginDTO) {
    try {
      const user = await this.userModel
        .findOne({
          phone: userCredential.phone,
        })
        .exec();
      if (user && userCredential.password === user.password) {
        const payload = { email: user.email, id: user.id };

        return { payload };
      }
      // return new UnauthorizedException('Invalid Credentials');
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createExpense(payload: ExpenseDTO) {
    try {
      const expense = new this.expenseModel(payload);
      return expense.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
