import mongoose from 'mongoose';

interface ICategory {
  name: String;
}

const CategorySchema = new mongoose.Schema<ICategory>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const Category = mongoose.model('Category', CategorySchema);
