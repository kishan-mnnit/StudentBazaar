// FoodDisplay.jsx
import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const FoodDisplay = (props) => {
  console.log(props);
  const { food_list } = useContext(StoreContext);
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  // List of categories
  const categories = ['All', 'Mobile', 'Cycle', 'Books', 'Gadgets', 'Others'];
  
  // Function to sort food items by price
  const sortFoodItems = (items, order) => {
    return items.sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  // Filter and sort food items based on college, category, and sortOrder
  const filteredFoodItems = food_list.filter((item) => {
    const collegeMatch = props.college === 'All' || item.college ===  props.college ;
    const categoryMatch = props.category === 'All' || item.category === props.category;
    return collegeMatch && categoryMatch;
  });

  const sortedFoodItems = sortFoodItems(filteredFoodItems, sortOrder);

  // Handle item click to navigate to the product details page
  const handleItemClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Items Near You</h2>
      <div className='food-display-controls'>
        <div className='category-buttons'>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-button ${props.category === cat ? 'active' : ''}`}
              onClick={() => props.setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className='sort-controls'>
          <label>Sort by price: </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>
      </div>
      <div className='food-display-list'>
        {sortedFoodItems.map((item) => {
          if (!item || !item.images || !item.images[0] || !item.name || !item.description || !item.price || !item._id) {
            console.error("Incomplete food item data:", item);
            return null; // or render some fallback UI
          }
          return (
            <div key={item._id} onClick={() => handleItemClick(item._id)}>
              <FoodItem
                image={item.images[0]}
                name={item.name}
                desc={item.description}
                price={item.price}
                id={item._id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
