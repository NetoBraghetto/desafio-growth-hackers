import { Request, Response } from 'express';
import { Category } from '../models/Category';

export class CategoryController {
  static async index(req: Request, res: Response) {
    res.status(200).json(await Category.find());
  }
}

export default new CategoryController();
