// FoodItem.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id }) => {
    // Ensure all required props are defined
    if (!image || !name || !price || !desc || !id) {
        console.error("Food item has missing properties:", { image, name, price, desc, id });
        return null; // Or return a fallback UI
    }

    const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleItemClick = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div className='food-item' onClick={handleItemClick}>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={`${url}/${image}`} alt={name} />
                {!cartItems[id] ? (
                    <img
                        className='add'
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(id);
                        }}
                        src={assets.add_icon_white}
                        alt="Add to cart"
                    />
                ) : (
                    <div className="food-item-counter" onClick={(e) => e.stopPropagation()}>
                        <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="Remove" />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="Add" />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating" />
                </div>
                <p className="food-item-desc">{desc}</p>
                <p className="food-item-price">{currency}{price}</p>
            </div>
        </div>
    );
};

export default FoodItem;
