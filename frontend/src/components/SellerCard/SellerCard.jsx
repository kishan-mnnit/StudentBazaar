import React from 'react';
import './SellerCard.css';
import avatar from '../../assets/pb.avif'


const SellerProfileCard = ({ seller }) => {
  return (
    <div className="seller-card">
      <div className="seller-card-header">
        <img src={avatar} alt="Seller Profile" className="profile-image" />
      </div>
      <div className="seller-card-body">
        <div className="seller-info">
          <h2>{seller.name}</h2>
          <p>{seller.title}</p>
        </div>
     
        <button className="follow-button">Follow</button>
        <p className="seller-description">{seller.college}</p>
        <p className="seller-description">{seller.batch}</p>

      </div>
    </div>
  );
};

export default SellerProfileCard;
