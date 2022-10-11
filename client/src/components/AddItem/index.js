import React from "react";
import { useNavigate } from "react-router-dom";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function AddItem(props) {
  const navigate = useNavigate();

  const handleClick = async (event) => {
    navigate('/form');
  };

  return (
    
    <button type="button" onClick={(event) => {
      handleClick(event);
    }}>Add your item</button>
  );
}

export default AddItem;