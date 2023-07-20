import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Expense, ExpenseSchema } from './entity/expense.entity';
import { User, UserSchema } from './entity/user.entity';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://rtisadmin:rtisPassword@localhost:27017/buztrack?authSource=admin&directConnection=true',
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Expense.name, schema: ExpenseSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
