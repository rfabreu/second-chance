import React from 'react';
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import AddItem from '../components/AddItem';
import { Grid } from 'semantic-ui-react'

function MyItems() {
    return (
        <div>
            <div class="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <CategoryMenu />
                    </div>
                    <div>
                        <AddItem />
                    </div>
                </div>
                <ProductList type="myItems" />
            </div >
        </div>
    );
}

export default MyItems;
