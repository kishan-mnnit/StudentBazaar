import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
// import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {
  const [college, setCollege] = useState('NIT Allahabad');
  const [category, setCategory] = useState('All');

  return (
    <>
      <Header />
      <ExploreMenu  college={college} setCollege={setCollege}/>
      <FoodDisplay setCollege={setCollege} setCategory={setCategory} category={category} college={college} />
    </>
  );
};

export default Home;
