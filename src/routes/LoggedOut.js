import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/duktown_logo.png';
import Button from '../components/Button.js';
import '../css/LoggedOut.css';

function LoggedOut(){

    const navigate = useNavigate();

    return (
        <div className='loggedout_container'>
            <img className='logo' src={logo} alt="duktown_logo"></img>
            <Button
                label="이메일로 회원가입"
                styleClass="button3"
                onClick={()=>{navigate('/signup')}}
            />
            <Button
                label="로그인"
                styleClass="button3" 
                onClick={()=>{navigate('/signin')}}
            />
        </div>
    );
}

export default LoggedOut;
