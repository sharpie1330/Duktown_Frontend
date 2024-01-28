import React, { useState } from 'react';
import '../css/Sign.css';
import arrow_left from '../assets/arrow_left.png';
import { useNavigate } from 'react-router-dom';

function FindId(){
    const navigate = useNavigate();
    const serverUrl = process.env.REACT_APP_BASEURL;
    const [id, setId] = useState('');

    // 인증번호 전송
    function sendCode(event) {
        event.preventDefault();
        const apiUrl = serverUrl + "/auth/id";
        const email = document.getElementsByName('email')[0].value;

        fetch(apiUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
            body: JSON.stringify({ "email": email}),
        })
        .then((response) => {
            if(!response.ok){
                return response.json().then(errorResponse => {
                    throw new EvalError(errorResponse.errorMessage);
                });
            }
            else{
                alert("이메일로 전송된 인증번호를 입력해주세요");
            }
        })
        .catch((error) => {
            alert(error);
        });
    }

    // 인증번호 확인
    function checkCode(event) {
        event.preventDefault();
        const apiUrl = serverUrl + "/auth/id/find";
        const email = document.getElementsByName('email')[0].value;
        const code = document.getElementsByName('code')[0].value;
        fetch(apiUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
            body: JSON.stringify({ 
                "email": email,
                "certCode": code
            }),
        })
        .then((response) => {
            if(!response.ok){
                return response.json().then(errorResponse => {
                    throw new EvalError(errorResponse.errorMessage);
                });
            }
            return response.json();
        })
        .then((data) => {
            setId(data.loginId);
        })
        .catch((error) => {
            alert(error);
        });
    }

    return(
        <>
            <div className="title_container">
                <div>
                    <img className='backBtn' src={arrow_left} alt="뒤로가기" onClick={()=>{navigate('/signin');}}></img>
                    아이디 찾기
                </div>
            </div>
            <div className='content_container'>
                {id === '' ?
                <>
                    <p>덕성 이메일</p>
                    <div className='inputFlexContainer'>
                        <input className='noLineInput' type="email" name="email" placeholder="duktown@duksung.ac.kr"/>
                        <span id="inputCheckBtn" onClick={sendCode}>인증번호 전송</span>
                    </div>
                    <br/>
                    <div className='inputFlexContainer'>
                        <input className='noLineInput' type="text" name="code" placeholder="이메일로 발송된 인증번호를 입력하세요"/>
                        <span id="inputCheckBtn" onClick={checkCode}>인증번호 확인</span>
                    </div>
                </>
                :
                <div className='Info'>
                    <p className="blueInfo">해당 이메일로 가입한 계정이 있어요!</p>
                    <p className='idInfo'>아이디: {id}</p>
                </div>
                }
                </div>
                {id === '' ?
                <button type="submit" className='bottomBtn'>
                    아이디 찾기
                </button>
                :
                <div className="bottomButtonContainer">
                    <button id="findPasswordButton" onClick={() => navigate('/findpassword')}>
                        비밀번호 찾기
                    </button>
                    <button id="loginButton" onClick={() => navigate('/signin')}>
                        로그인 하기
                    </button>
                </div>
                }
        </>
    )
}

export default FindId;