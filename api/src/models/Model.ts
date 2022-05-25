import { Model } from 'mongoose';

export interface IDocumentModel<T> extends Model<T> {
  fillable(): Array<keyof T>;
}
