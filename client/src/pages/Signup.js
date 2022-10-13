import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { Container, Form, Button } from 'semantic-ui-react';

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                email: formState.email,
                password: formState.password,
                firstName: formState.firstName,
                lastName: formState.lastName,
            },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div class="form-container">
            <div style={{ border: '1px solid #dbdbdb', borderRadius: '6px', padding: '30px 20px', maxWidth: 450 }} className="container">
                <h2><b>Signup</b></h2>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group widths='equal'>
                        {/* <Form.Input
                            fluid
                            label='First Name:'
                            placeholder='First'
                            name='firstName'
                            id='firstName'
                            onChange={handleChange}
                        /> */}
                        <div class="mx-1 my-1">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                placeholder="First"
                                name="firstName"
                                type="text"
                                id="firstName"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mx-1 my-1">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                placeholder="Last"
                                name="lastName"
                                type="text"
                                id="lastName"
                                onChange={handleChange}
                            />
                        </div>
                    </Form.Group>
                    <div className="my-2">
                        <label htmlFor="email">Email:</label>
                        <input
                            placeholder="your.email@test.com"
                            name="email"
                            type="email"
                            id="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="my-2">
                        <label htmlFor="pwd">Password:</label>
                        <input
                            placeholder="**************"
                            name="password"
                            type="password"
                            id="pwd"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row flex-end">
                        <Button primary fluid size='large' type="submit">Submit</Button>
                    </div>
                </Form>
            </div>
            <Container fluid className='my-1' textAlign='center'>
                <Link to='/login'>Or click here to create an <b>log in</b></Link>
            </Container>
        </div>
    );
}

export default Signup;
