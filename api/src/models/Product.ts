import mongoose, { Schema, Types } from 'mongoose';
import { IDocumentModel } from './Model';

export interface IProduct {
  name: String;
  price: Number;
  category_id: Types.ObjectId;
}
interface IProductModel extends IDocumentModel<IProduct> {}

const ProductSchema = new mongoose.Schema<IProduct, IProductModel>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      immutable: true,
    },
  },
  { timestamps: true },
);

ProductSchema.static('fillable', () => ['name', 'price']);

export const Product = mongoose.model<IProduct, IProductModel>(
  'Product',
  ProductSchema,
);
