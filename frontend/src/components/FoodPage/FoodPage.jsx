import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FoodPage.css';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import SellerProfileCard from '../SellerCard/SellerCard';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const { url } = useContext(StoreContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [similarItems, setSimilarItems] = useState([]);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${url}/api/food/${id}`);
        if (response.data.success) {
          setProduct(response.data.data);
          const similarResponse = await axios.get(`${url}/api/food/similar/${id}`);
          if (similarResponse.data.success) {
            setSimilarItems(similarResponse.data.data);
          }
          const sellerResponse = await axios.get(`${url}/api/user/seller/${response.data.data.seller}`);
          if (sellerResponse.data.success) {
            setSeller(sellerResponse.data.data);
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("An error occurred while fetching the product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, url]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const images = product.images.map(image => `${url}/${image}`);

  return (
    <div className="product-details">
      <div className="product-container">
        <div className="image-carousel">
          <div className="main-image">
            <img src={images[mainImageIndex]} alt={product.name} />
          </div>
          <div className="thumbnails">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={index === mainImageIndex ? 'active' : ''}
                onClick={() => setMainImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="price">₹{product.price}</div>
     
          <button className="add-to-bag">Add to Bag</button>
          <button className="buy-now">Buy Now</button>
        </div>
      </div>
      <div className="product-info-des">

      <div className="product-description">
        <h2>Description</h2>
        <p>{product.description}</p>
      </div>
       <div>
       {seller && <SellerProfileCard seller={seller} />}

       </div>
      </div>
   

      <div className="similar-items">
        <h2>Similar Products</h2>
        <div className="similar-items-list">
          {similarItems.map(item => (
            
            <FoodItem
              key={item._id}
              id={item._id}
              image={item.images[0]} 
              name={item.name}
              desc={item.description}
              price={item.price}
              
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
