import React from 'react';
import '../css/Sign.css';
import arrow_left from '../assets/arrow_left.png';
import { useNavigate } from 'react-router-dom';

function FindPassword(){
    const navigate = useNavigate();
    const serverUrl = process.env.REACT_APP_BASEURL;

    // 인증번호 전송
    function sendCode(event) {
        event.preventDefault();
    }

    return(
        <>
            <div className="title_container">
                <img className='backBtn' src={arrow_left} alt="뒤로가기" onClick={()=>{navigate('/signin');}}></img>
                비밀번호 찾기
            </div>
            <form className="signin_form">
                <div className='content_container'>
                    <p>가입한 덕성 이메일</p>
                    <div className='inputFlexContainer'>
                        <input className='noLineInput' type="text" name="id" placeholder="duktown@duksung.ac.kr"/>
                        <span id="inputCheckBtn" onClick={sendCode}>계정 확인</span>
                    </div>
                </div>
            </form>
            <button type="submit" className='bottomBtn'>
                이메일로 임시 비밀번호 보내기
            </button>
        </>
    )
}

export default FindPassword;