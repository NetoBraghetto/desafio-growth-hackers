import { Request, Response } from 'express';
import { ModelNotFound } from '../exceptions/ModelNotFound';
import { Category } from '../models/Category';

export class CategoryController {
  public async index(req: Request, res: Response) {
    res.status(200).json(await Category.find().exec());
  }

  public async view(req: Request<{ id: string }>, res: Response) {
    const category = await Category.findById(req.params.id).exec();
    if (!category) {
      throw new ModelNotFound();
    }
    res.status(200).json(category);
  }

  public async store(req: Request, res: Response) {
    res.status(201).json(await Category.create(req.body));
  }

  public async update(req: Request<{ id: string }>, res: Response) {
    const category = await Category.findById(req.params.id).exec();
    if (!category) {
      throw new ModelNotFound();
    }
    // const updated = Category.fill(category, Category.fillable());
    // console.log(Category.me);
    // console.log(updated);
    // console.log(Object.keys(Category.schema.paths));
    category.name = req.body.on;
    res.status(200).json(await category.save());
  }

  public async delete(req: Request<{ id: string }>, res: Response) {
    const category = await Category.findById(req.params.id).exec();
    if (!category) {
      throw new ModelNotFound();
    }
    await Category.deleteOne({ _id: category._id }).exec();
    res.status(200).json(category);
  }
}

export default new CategoryController();
