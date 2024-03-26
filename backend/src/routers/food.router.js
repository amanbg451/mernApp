import { Router } from 'express';
import { FoodModel } from '../models/food.model.js';
import handler from 'express-async-handler';
import admin from '../middleware/admin.mid.js';
const router = Router();

router.get(
    '/',
    handler(async (req, res) => {
        const foods = await FoodModel.find({});
        res.send(foods);
    })
);
router.get(
    '/search/:searchTerm',
    handler(async (req, res) => {
        const { searchTerm } = req.params;
        const searchRegex = new RegExp(searchTerm, 'i');

        const foods = await FoodModel.find({ name: { $regex: searchRegex } });
        res.send(foods);
    })
);


router.post(
    '/',
    admin,
    handler(async (req, res) => {
        const { name, price, imageUrl, cookTime } =
            req.body;

        const food = new FoodModel({
            name,
            price,
            imageUrl,
            cookTime,
        })

        await food.save();
        res.send(food);
    })
);

router.put(
    '/',
    admin,
    handler(async (req, res) => {
        const { id, name, price, imageUrl, cookTime } =
            req.body;

        await FoodModel.updateOne(
            { _id: id },
            {
                name,
                price,
                imageUrl,
                cookTime,
            }
        );

        res.send();
    })
);

router.delete(
    '/:foodId',
    admin,
    handler(async (req, res) => {
        const { foodId } = req.params;
        await FoodModel.deleteOne({ _id: foodId });
        res.send();
    })
);


router.get(
    '/:foodId',
    handler(async (req, res) => {
        const { foodId } = req.params;
        const food = await FoodModel.findById(foodId);
        res.send(food);
    })
);

export default router;