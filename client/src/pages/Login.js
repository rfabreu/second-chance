import React from 'react';
import { Link } from 'react-router-dom';
import LoginItem from '../components/LoginItem';
import { Container } from 'semantic-ui-react'

function Login(props) {
    return (
        <div className='form-container'>
            <LoginItem />
            <Container fluid className='my-1' textAlign='center'>
                <Link to='/signup'>Or click here to create an <b>account</b></Link>
            </Container>
        </div>
    );
}

export default Login;
