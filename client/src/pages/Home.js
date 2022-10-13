import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import { Container } from 'semantic-ui-react'

const Home = () => {
    return (
        <div className="container my-2">
            <Container>
                <CategoryMenu />
                <ProductList />
                <Cart />
            </Container>
        </div >
    );
};

export default Home;
