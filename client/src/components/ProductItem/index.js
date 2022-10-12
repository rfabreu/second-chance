import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { Button, Container, Image } from 'semantic-ui-react'

function ProductItem(item) {
    const [state, dispatch] = useStoreContext();

    const { data } = useQuery(QUERY_USER);
    let currentUser;

    if (data) {
        currentUser = data.user._id;
    }

    const {
        image,
        name,
        _id,
        price,
        quantity,
        ownedBy,
    } = item;

    const { cart } = state

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === _id)
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...item, purchaseQuantity: 1 }
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
        }
    }

    return (
        <div className="card px-2 py-2">
            <Link to={`/products/${_id}`}>
                <Image
                    alt={name}
                    src={`${image}`}
                    verticalAlign='bottom'
                    fluid
                />
            </Link>
            <Container textAlign='left'>
                <Link to={`/products/${_id}`}>
                    <p style={{ color: 'black' }}>{name}</p>
                </Link>
                <div>
                    <div>{quantity} {pluralize("item", quantity)} in stock</div>
                    <span>${price}</span>
                </div>
            </Container>
            {ownedBy === currentUser ? "" : <Button primary onClick={addToCart}>Add to cart</Button>}
        </div>
    );
}

export default ProductItem;
