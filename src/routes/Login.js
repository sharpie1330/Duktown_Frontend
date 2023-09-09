import React from 'react';
import logo from '../assets/duktown_logo.png';
import '../css/Login.css';
import Button from '../components/Button.js';
import { useNavigate } from 'react-router-dom';

function Login(){
    const navigate = useNavigate();
    function btnClick(){
        navigate('/home');
    }

    return (
        <div className='login-container'>
            <img className='logo' src={logo} alt="duktown_logo"></img>
            <Button
                label="포털 로그인 연동"
                styleClass="button3" 
                onClick={btnClick}
            />
        </div>
    );
}

export default Login;
