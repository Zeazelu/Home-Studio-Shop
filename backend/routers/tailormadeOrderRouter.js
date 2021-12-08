import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import TailormadeOrder from '../models/tailormadeOrderModel.js';
import { isAdmin, isAuth } from '../utils.js';

const tailormadeOrderRouter = express.Router();
tailormadeOrderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const tailormadeorders = await TailormadeOrder.find({ user: req.user._id });
    res.send(tailormadeorders);
}));

tailormadeOrderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    if (req.body.tailormadeOrderItems.length === 0) {
        res.status(400).send({ message: 'Koszyk jest pusty' });
    } else {
        const tailormadeorder = new TailormadeOrder({
            tailormadeOrderItems: req.body.tailormadeOrderItems,
            tailormadeShippingAddress: req.body.tailormadeShippingAddress,
            paymentMethod: req.body.paymentMethod,
            tailormadeItemsPrice: req.body.tailormadeItemsPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
            dimensions: req.body.dimensions,
        });
        const createdTailormadeOrder = await tailormadeorder.save();
        res.status(201).send({ message: 'Stworzono nowe zamówienie', tailormadeorder: createdTailormadeOrder });
    }
}));
tailormadeOrderRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const tailormadeorders = await TailormadeOrder.find({}).populate('user', 'name');
      res.send(tailormadeorders);
    })
  );
tailormadeOrderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const tailormadeorder = await TailormadeOrder.findById(req.params.id);
    if (tailormadeorder) {
        res.send(tailormadeorder);
    } else {
        res.status(404).send({ message: 'Nie znaleziono zamówienia' });
    }
}));

tailormadeOrderRouter.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const tailormadeorder = await TailormadeOrder.findById(req.params.id);
        if (tailormadeorder) {
            tailormadeorder.isPaid = true;
            tailormadeorder.paidAt = Date.now();
            tailormadeorder.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };
            const updatedTailormadeOrder = await tailormadeorder.save();
            res.send({ message: 'Zamówienie opłacone', tailormadeorder: updatedTailormadeOrder });
        } else {
            res.status(404).send({ message: 'Nie znaleziono zamówienia' });
        }
    })
);

tailormadeOrderRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const tailormadeorder = await TailormadeOrder.findById(req.params.id);
      if (tailormadeorder) {
        const deleteTailormadeOrder = await tailormadeorder.remove();
        res.send({ message: 'Order Deleted', tailormadeorder: deleteTailormadeOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );
  tailormadeOrderRouter.put(
    '/:id/deliver',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const tailormadeorder = await TailormadeOrder.findById(req.params.id);
      if (tailormadeorder) {
        tailormadeorder.isDelivered = true;
        tailormadeorder.deliveredAt = Date.now();
  
        const updatedTailormadeOrder = await tailormadeorder.save();
        res.send({ message: 'Order Delivered', tailormadeorder: updatedTailormadeOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );
export default tailormadeOrderRouter;