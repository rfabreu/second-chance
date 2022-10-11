import React from 'react';
import { Link } from 'react-router-dom';
import LoginItem from '../components/LoginItem';

function Login(props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', padding: '5px'}}>
            <Link to="/signup">← Go to Signup</Link>
            <h2>Login</h2>
            <LoginItem />
        </div>
    );
}

export default Login;
