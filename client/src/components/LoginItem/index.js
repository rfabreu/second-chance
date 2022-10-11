import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';

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
        <div style={{ display: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Form size={'huge'} onSubmit={handleFormSubmit}>
                <Form.Field>
                    <label htmlFor="email">Email address:</label>
                    <input
                        placeholder="your.email@test.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="pwd">Password:</label>
                    <input
                        placeholder="******"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                </Form.Field>
                {error ? (
                    <div>
                        <p className="error-text">The provided credentials are incorrect</p>
                    </div>
                ) : null}
                <div className="flex-row flex-end">
                    <Button type="submit">Submit</Button>
                </div>
            </Form>
        </div>
    );
}

export default LoginItem;
