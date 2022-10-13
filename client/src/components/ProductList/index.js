import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS, QUERY_USER } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import { Form, Button } from 'semantic-ui-react'

function ProductList(props) {
    const [state, dispatch] = useStoreContext();

    const { currentCategory } = state;

    const [formState, setFormState] = useState('');

    const { loading, data } = useQuery(QUERY_PRODUCTS);

    const response = useQuery(QUERY_USER);
    let currentUser;

    if (response.data) {
        currentUser = response.data.user._id;
    }

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products,
            });
            data.products.forEach((product) => {
                idbPromise('products', 'put', product);
            });
        } else if (!loading) {
            idbPromise('products', 'get').then((products) => {
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: products,
                });
            });
        }
    }, [data, loading, dispatch]);

    function filterProducts() {
        if (props.type === "myItems") {
            if (!currentCategory) {
                return state.products.filter(
                    (product) => product !== undefined && product.ownedBy === currentUser
                );
            }

            return state.products.filter(
                (product) => (product.category._id === currentCategory) && (product.ownedBy === currentUser)
            );
        }

        if (!currentCategory) {
            return state.products;
        }

        return state.products.filter(
            (product) => product.category._id === currentCategory
        );
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
        console.log(formState);
    }

    return (
        <div className="my-2">
            {/* <h3>Search Products:</h3>
            <Form>
                <Form.Field id='searchProductName' width={4}>
                    <label for="productName">Enter a product name:</label>
                    <input type="text" name="productName" onChange={handleChange} />
                    <Button type='submit' form='searchProductName' value='Submit'>Search</Button>
                </Form.Field>
            </Form> */}
            <div className="my-3">
                <h2><b>Listed Products:</b></h2>
                {state.products.length ? (
                    <div className="flex-row">
                        {filterProducts().map((product) => (
                            <ProductItem
                                key={product._id}
                                _id={product._id}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                quantity={product.quantity}
                                ownedBy={product.ownedBy}
                            />
                        ))}
                    </div>
                ) : (
                    <h3>You haven't added any products yet!</h3>
                )}
                {loading ? <img src={spinner} alt="loading" /> : null}
            </div>
        </div>
    );
}

export default ProductList;
