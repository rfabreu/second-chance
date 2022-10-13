import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { Container, Header, Button, Form } from 'semantic-ui-react'

function LoginItem(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { email: formState.email, password: formState.password },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div style={{ border: '1px solid #dbdbdb', borderRadius: '6px', padding: '30px 20px', maxWidth: 450 }} className="container">
            <h2><b>Login</b></h2>
            <Form onSubmit={handleFormSubmit}>
                <Form.Input
                    fluid
                    label='Email address:'
                    placeholder='your.email@test.com'
                    name="email"
                    type="email"
                    id="email"
                    onChange={handleChange}
                />
                <Form.Input
                    fluid
                    label='Password:'
                    placeholder="**************"
                    name="password"
                    type="password"
                    id="pwd"
                    onChange={handleChange}
                />
                {error ? (
                    <div>
                        <p className="error-text" style={{ color: '#e33030' }}>The provided credentials are incorrect</p>
                    </div>
                ) : null}
                <div>
                    <Button primary type="submit" fluid size='large'>Submit</Button>
                </div>
            </Form>
            {/* <h2>Log in</h2>
            <Form onSubmit={handleFormSubmit}>
                <div className="flex-row space-between my-2">
                    <label htmlFor="email">Email address:</label>
                    <input
                        placeholder="your.email@test.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="pwd">Password:</label>
                    <input
                        placeholder="**************"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                </div>
                {error ? (
                    <div>
                        <p className="error-text" style={{ color: '#e33030' }}>The provided credentials are incorrect</p>
                    </div>
                ) : null}
                <div class='ui horizontally padded'>
                    <Button primary type="submit" fluid size='large'>Submit</Button>
                </div>
            </Form> */}
        </div>
    );
}

export default LoginItem;
