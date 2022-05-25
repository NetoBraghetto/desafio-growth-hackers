import mongoose, { Schema } from 'mongoose';
import { IDocumentModel } from './Model';
import { IProduct } from './Product';

export interface ICategory {
  name: String;
  products?: IProduct[];
}
interface ICategoryModel extends IDocumentModel<ICategory> {}

const CategorySchema = new mongoose.Schema<ICategory, ICategoryModel>(
  {
    name: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true },
);

CategorySchema.static('fillable', () => ['name']);

export const Category = mongoose.model<ICategory, ICategoryModel>(
  'Category',
  CategorySchema,
);
