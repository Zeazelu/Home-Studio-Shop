import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Tailormade from '../models/tailormadeModel.js';
import { isAdmin, isAuth } from '../utils.js';

const tailormadeRouter = express.Router();

tailormadeRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const tailormades = await Tailormade.find({});
        res.send(tailormades);
    })
);

tailormadeRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        // await Product.remove({});
        const createdTailormades = await Tailormade.insertMany(data.tailormades);
        res.send({ createdTailormades });
    })
);

tailormadeRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const tailormade = await Tailormade.findById(req.params.id);
        if (tailormade) {
            res.send(tailormade);
        } else {
            res.status(404).send({ message: 'Nie znaleziono produktu' });
        }
    })
);

tailormadeRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const tailormade = new Tailormade({
            name: 'Nazwa ' + Date.now(),
            image: '/images/p1.jpg',
            price: 0,
            category: 'Kategoria',
            description: 'Opis',
        });
        const createdTailormade = await tailormade.save();
        res.send({ message: 'Dodano produkt', product: createdTailormade });
    })
);

tailormadeRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const tailormadeId = req.params.id;
        const tailormade = await Tailormade.findById(tailormadeId);
        if (tailormade) {
            tailormade.name = req.body.name;
            tailormade.price = req.body.price;
            tailormade.image = req.body.image;
            tailormade.category = req.body.category;
            tailormade.description = req.body.description;
            const updatedTailormade = await tailormade.save();
            res.send({ message: 'Produkt zaktualizowany', tailormade: updatedTailormade });
        } else {
            res.status(404).send({ message: 'Nie znaleziono produktu' });
        }
    })
);

tailormadeRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const tailormade = await Tailormade.findById(req.params.id);
        if (tailormade) {
            const deleteTailormade = await tailormade.remove();
            res.send({ message: 'Produkt usunięty', tailormade: deleteTailormade });
        } else {
            res.status(404).send({ message: 'Nie znaleziono produktu' });
        }
    })
);

export default tailormadeRouter;