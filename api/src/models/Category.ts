import mongoose from 'mongoose';

const Categorychema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true },
);

export const Category = mongoose.model('Category', Categorychema);
