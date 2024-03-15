import React, { useEffect, useState } from 'react';
import Price from '../../components/Price/Price';
import classes from './foodPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../../services/foodService';
import { useCart } from '../../hooks/useCart';
export default function FoodPage() {
    const [food, setFood] = useState({});
    const { id } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addToCart(food);
        navigate('/cart');
    };

    useEffect(() => {
        getById(id).then(setFood);
    }, [id]);
    return (
        <>
            {
                food && (
                    <div className={classes.container}>
                        <img
                            className={classes.image}
                            src={`/foods/${food.imageUrl}`}
                            alt={food.name}
                        />

                        <div className={classes.details}>
                            <div className={classes.header}>
                                <span className={classes.name}>{food.name}</span>
                            </div>

                            <div className={classes.cook_time}>
                                <span>
                                    Time to cook about <strong>{food.cookTime}</strong> minutes
                                </span>
                            </div>

                            <div className={classes.price}>
                                <Price price={food.price} />
                            </div>

                            <button onClick={handleAddToCart}>Add To Cart</button>
                        </div>
                    </div>
                )
            }
        </>
    );
}