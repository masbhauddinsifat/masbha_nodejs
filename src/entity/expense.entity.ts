import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema()
export class Expense {
  @Prop()
  date: string;

  @Prop()
  amount: number;

  @Prop()
  expenseType: string;

  @Prop()
  user: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
