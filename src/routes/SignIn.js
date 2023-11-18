import React, { useState, useEffect, useContext } from 'react';
import AccessTokenContext from '../AccessTokenContext';
import '../css/Sign.css';
import arrow_left from '../assets/arrow_left.png';
import { useNavigate } from 'react-router-dom';

function SignIn(){
    const navigate = useNavigate();
    const { setAccessToken } = useContext(AccessTokenContext);
    const serverUrl = "http://localhost:8080";

    // 로그인
    function handleSignIn(event) {
        event.preventDefault();

        const apiUrl = serverUrl + "/auth/login";
        const id = event.target.id.value;
        const pwd = event.target.pwd.value;

        const userData = {
            "loginId": id, 
            "password": pwd
        }
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData),
        };

        fetch(apiUrl, request)
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    const roleTpye =response.roleTpye;
                    const accessToken = response.accessToken;
                    const refreshToken = response.refreshToken;
                    setAccessToken(accessToken);
                    navigate('/main');
                    return;
                }
                else {
                    return response.json();
                }
            })
            .then((data) => {
                alert(data.errorMessage);
            })
            .catch((error) => {
                console.error('로그인 실패', error);
            });
    }

    return(
        <>
            <div className="title_container">
                <img className='backBtn' src={arrow_left} onClick={()=>{navigate('/');}}></img>
                로그인
            </div>
            <form className="signin_form" onSubmit={handleSignIn}>
            {/* <form className="signin_form"> */}
                <div className='content_container'>
                    <p>아이디</p>
                    <input type="text" name="id" placeholder="6~12자 영문, 숫자 조합"></input>
                    <br/>
                    <p>비밀번호</p>
                    <input type="text" name="pwd" placeholder="8자 이상 영문, 숫자 조합"></input>
                    <a href=''>아이디 및 비밀번호 찾기</a>
                </div>
                <button type="submit" className='bottomBtn'>
                {/* <button type="submit" className='bottomBtn' onClick={()=>{navigate('/main');}}> */}
                    로그인하기
                </button>
            </form>
        </>
    )
}

export default SignIn;