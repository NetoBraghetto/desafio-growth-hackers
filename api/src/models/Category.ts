import mongoose, { Model } from 'mongoose';

interface ICategory {
  name: String;
}
interface ICategoryModel extends Model<ICategory> {
  fillable(): String[];
  // fill(category: ICategory, fields: String[]): void;
}

const CategorySchema = new mongoose.Schema<ICategory, ICategoryModel>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

CategorySchema.static('fillable', () => ['name']);

// CategorySchema.static('fill', (category: ICategory, fields: String[]) => {
//   console.log(category, fields);
//   // console.log(category.fillable());
// });

export const Category = mongoose.model<ICategory, ICategoryModel>(
  'Category',
  CategorySchema,
);
