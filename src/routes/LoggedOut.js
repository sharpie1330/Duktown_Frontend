import React from 'react';
import logo from '../assets/duktown_logo.png';
import '../css/LoggedOut.css';
import Button from '../components/Button.js';
import { useNavigate } from 'react-router-dom';

function LoggedOut(){
    const navigate = useNavigate();
    function signUp(){
        navigate('/home');
    }
    function signIn(){
        navigate('/signin');
    }

    return (
        <div className='loggedout_container'>
            <img className='logo' src={logo} alt="duktown_logo"></img>
            <Button
                label="이메일로 회원가입"
                styleClass="button3"
                onClick={signUp}
            />
            <Button
                label="로그인"
                styleClass="button3" 
                onClick={signIn}
            />
        </div>
    );
}

export default LoggedOut;
