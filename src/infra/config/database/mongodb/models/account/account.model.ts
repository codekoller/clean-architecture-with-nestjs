import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<AccountModel>;

@Schema({
  collection: 'accounts',
  timestamps: true,
})
export class AccountModel {
  @Prop({
    type: String,
    default: () => randomUUID(),
  })
  _id!: string;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  surname: string;

  @Prop({
    type: Number,
    required: true,
  })
  age: number;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: Date,
  })
  createdAt: Date;

  @Prop({
    type: Date,
  })
  updatedAt: Date;
}

export const AccountSchema = SchemaFactory.createForClass(AccountModel);
