import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'semantic-ui-react'

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function AddItem(props) {
    const navigate = useNavigate();

    const handleClick = async (event) => {
        navigate('/form');
    };

    return (

        <Button primary type="button" onClick={(event) => {
            handleClick(event);
        }}>Create a new listing</Button>
    );
}

export default AddItem;