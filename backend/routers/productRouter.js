import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const category = req.query.category || '';
    const order = req.query.order || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;
    const categoryFilter = category ? { category } : {};
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };
    const products = await Product.find({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate()
      .sort(sortOrder);
    res.send(products);
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Nie znaleziono produktu' });
    }
  })
);

productRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'Nazwa ' + Date.now(),
      image: '/images/p1.jpg',
      price: 0,
      category: 'Kategoria',
      brand: 'Marka',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'Opis',
    });
    const createdProduct = await product.save();
    res.send({ message: 'Dodano produkt', product: createdProduct });
  })
);

productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: 'Produkt zaktualizowany', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Nie znaleziono produktu' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Produkt usunięty', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Nie znaleziono produktu' });
    }
  })
);

export default productRouter;

productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);