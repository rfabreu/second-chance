import React from 'react';
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";

import AddItem from '../components/AddItem';

function MyItems() {
  return (
    <>
      <div className="container">
        <AddItem />
        <CategoryMenu />
        <ProductList type="myItems" />
      </div>
    </>
  );
}

export default MyItems;
