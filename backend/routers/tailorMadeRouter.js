import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import TailorMade from '../models/tailorMadeModel.js';
import { isAdmin, isAuth } from '../utils.js';

const tailorMadeRouter = express.Router();

tailorMadeRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const tailormades = await TailorMade.find({});
        res.send(tailormades);
    })
);

tailorMadeRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        // await Product.remove({});
        const createdTailorMades = await TailorMade.insertMany(data.tailormades);
        res.send({ createdTailorMades });
    })
);

tailorMadeRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const tailormade = await TailorMade.findById(req.params.id);
        if (tailormade) {
            res.send(tailormade);
        } else {
            res.status(404).send({ message: 'Nie znaleziono produktu' });
        }
    })
);

tailorMadeRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const tailormade = new TailorMade({
            name: 'Nazwa ' + Date.now(),
            image: '/images/p1.jpg',
            price: 0,
            category: 'Kategoria',
            numReviews: 0,
            description: 'Opis',
            height: 0,
            width: 0,
            sleeveCircumference: 0,
            collarCircumference: 0,
            chestCircumference: 0,
            waistCircumference: 0,
        });
        const createdTailorMade = await tailorMade.save();
        res.send({ message: 'Dodano produkt', product: createdTailorMade });
    })
);

tailorMadeRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const tailormadeId = req.params.id;
        const tailormade = await TailorMade.findById(tailormadeId);
        if (tailormade) {
            tailormade.name = req.body.name;
            tailormade.price = req.body.price;
            tailormade.image = req.body.image;
            tailormade.category = req.body.category;
            tailormade.description = req.body.description;
            tailormade.height = req.body.height;
            tailormade.width = req.body.width;
            tailormade.sleeveCircumference = req.body.sleeveCircumference;
            tailormade.collarCircumference = req.body.collarCircumference;
            tailormade.chestCircumference = req.body.chestCircumference;
            tailormade.waistCircumference = req.body.waistCircumference;
            const updatedTailorMade = await tailorMade.save();
            res.send({ message: 'Produkt zaktualizowany', tailormade: updatedTailorMade });
        } else {
            res.status(404).send({ message: 'Nie znaleziono produktu' });
        }
    })
);

tailorMadeRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const tailormade = await TailorMade.findById(req.params.id);
        if (tailormade) {
            const deleteTailorMade = await tailormade.remove();
            res.send({ message: 'Produkt usunięty', tailormade: deleteTailorMade });
        } else {
            res.status(404).send({ message: 'Nie znaleziono produktu' });
        }
    })
);

export default tailorMadeRouter;