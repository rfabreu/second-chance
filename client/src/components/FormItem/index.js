import React, { useState, useEffect } from "react";
import { useStoreContext } from '../../utils/GlobalState';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT_MUTATION } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { Button, Form, Grid } from 'semantic-ui-react'

function FormItem() {
    const [state] = useStoreContext();
    const { categories } = state;
    const [addProduct] = useMutation(ADD_PRODUCT_MUTATION);
    //const [addImage] = useMutation(UPLOAD_FILE);
    const navigate = useNavigate();
    const [formImage, setFormImage] = useState();
    const [preview, setPreview] = useState()

    const { data } = useQuery(QUERY_USER);
    let currentUser;

    if (data) {
        currentUser = data.user._id;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const categoryName = event.target.elements.product_category.value;
        let categoryId;
        categories.map((item) => {
            if (item.name === categoryName) {
                categoryId = item._id;
            }
        });
        const formData = {
            name: event.target.elements.product_name.value,
            description: event.target.elements.product_description.value,
            image: formImage.name,
            file: formImage,
            quantity: parseInt(event.target.elements.product_quantity.value),
            price: parseInt(event.target.elements.product_price.value),
            ownedBy: currentUser,
            category: { _id: categoryId, name: categoryName },
        };
        console.log(formData)
        // await addImage({ variables: {file: formImage}})
        await addProduct({ variables: formData });

        //navigate('/myItems');
        //window.location.reload(); 
    };
    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!formImage) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(formImage)
        console.log(objectUrl)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [formImage])

    const singleFileChangedHandler = (e) => {
        e.preventDefault();
        if (!e.target.files || e.target.files.length === 0) {
            setFormImage(undefined)
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setFormImage(e.target.files[0])
        console.log(e.target.files[0])
    };

    const handleClick = async (event) => {
        navigate('/myItems');
    };

    return (
        <div className='container' style={{ border: '1px solid #dbdbdb', borderRadius: '6px', padding: '30px 20px', maxWidth: 600 }}>
            <h2><b>Create a new listing:</b></h2>
            <Form onSubmit={(event) => {
                handleSubmit(event);
            }}>
                <div className='py-1'>
                    <label htmlFor="name"><b>Name:</b></label>
                    <input type="text" id="product_name" placeholder="Product name..." required />
                </div>
                <div className='py-1'>
                    <label><b>Category:</b></label>
                    <select name="product_category">
                        {categories.map((item) => (
                            <option
                                id={item._id}
                                name={item.name}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='py-1'>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Price:' type='number' id='product_price' placeholder='1.99' required />
                        <Form.Input fluid label='Quantity:' type='number' id='product_quantity' placeholder='0' required />
                        {/* <div className='py-1'>
                        <label >Price:</label>
                        <input type="number" id="product_price" required />
                    </div>
                    <div className='py-1'>
                        <label >Quantity:</label>
                        <input type="number" id="product_quantity" required />
                    </div> */}
                    </Form.Group>
                </div>
                <div className='py-1'>
                    <Form.TextArea label='Description' placeholder='Add a description for your product...' id='product_description' />
                    {/* <label><b>Description:</b></label>
                    <input type="text" id="product_description" placeholder="Description..." required /> */}
                </div>
                <div className='py-1'>
                    <label htmlFor="product_image"><b>Image:</b></label>
                    <input
                        type="file" name="product_image"
                        width="48" height="48"
                        required
                        onChange={singleFileChangedHandler}
                    />
                    {formImage && <img src={preview} alt="" />}
                    <div className="panel" style={{ display: 'flex', alignContent: 'center', paddingTop: '20px' }}>
                        <Button fluid primary id="add-product-button" type="submit" className="button">Add</Button>
                        <Button fluid color='red' type="button" onClick={(event) => {
                            handleClick(event);
                        }}>Cancel</Button>
                    </div>
                </div>
            </Form>

        </div>
    );
};

export default FormItem;