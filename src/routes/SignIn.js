import React from 'react';
import '../css/SignIn.css';
import arrow_left from '../assets/arrow_left.png';
import { useNavigate } from 'react-router-dom';

function SignIn(){
    const navigate = useNavigate();
    function signIn(){
        /* 로그인 API 연결 */
        navigate('/home');
    }

    return(
        <>
            <div className="title_container">
                <img className='backBtn' src={arrow_left} onClick={()=>{navigate('/');}}></img>
                로그인
            </div>
            <div className='content_container'>
                <form className="signin_form">
                    <p>아이디</p>
                    <input type="text" name="id" placeholder="6~12자 영문, 숫자 조합"></input>
                    <br/>
                    <p>비밀번호</p>
                    <input type="text" name="pwd" placeholder="8자 이상 영문, 숫자 조합"></input>
                </form>
                <a href=''>아이디 및 비밀번호 찾기</a>
            </div>
            
            <button className='signInBtn' onClick={signIn}>
                로그인하기
            </button>
        </>
    )
}

export default SignIn;