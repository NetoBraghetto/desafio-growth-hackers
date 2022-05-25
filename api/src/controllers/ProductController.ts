import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ModelNotFound } from '../exceptions/ModelNotFound';
import { Product } from '../models/Product';

export class ProductController {
  public async index(req: Request<{ category_id: string }>, res: Response) {
    res.status(200).json(
      await Product.find({
        category_id: new Types.ObjectId(req.params.category_id),
      }).exec(),
    );
  }

  public async view(
    req: Request<{ category_id: string; id: string }>,
    res: Response,
  ) {
    const product = await Product.findById(req.params.id).exec();
    if (!product) {
      throw new ModelNotFound();
    }
    res.status(200).json(product);
  }

  public async store(req: Request<{ category_id: string }>, res: Response) {
    const data: Record<string, any> = {
      category_id: new Types.ObjectId(req.params.category_id),
    };
    Product.fillable().forEach((field: string) => {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    });
    res.status(201).json(await Product.create(data));
  }

  public async update(
    req: Request<{ category_id: string; id: string }>,
    res: Response,
  ) {
    const product = await Product.findById(req.params.id).exec();
    if (!product) {
      throw new ModelNotFound();
    }
    Product.fillable().forEach((field: string) => {
      if (req.body[field] !== undefined) {
        product.set(field, req.body[field]);
      }
    });

    res.status(200).json(await product.save());
  }

  public async delete(
    req: Request<{ category_id: string; id: string }>,
    res: Response,
  ) {
    const product = await Product.findById(req.params.id).exec();
    if (!product) {
      throw new ModelNotFound();
    }
    await Product.deleteOne({ _id: product._id }).exec();
    res.status(200).json(product);
  }
}

export default new ProductController();
