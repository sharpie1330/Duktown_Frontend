import React from 'react';
import '../css/Sign.css';
import arrow_left from '../assets/arrow_left.png';
import { useNavigate } from 'react-router-dom';

function SignUp(){
    const navigate = useNavigate();
    return(
        <>
            <div className="title_container">
                <img className='backBtn' src={arrow_left} onClick={()=>{navigate('/');}}></img>
                회원가입
            </div>
            <div className='content_container'>
                <form className="signup_form">
                    <p>아이디</p>
                    <input type="text" name="id" placeholder="6~12자 영문, 숫자 조합"></input>
                    <br/>
                    <p>비밀번호</p>
                    <input type="password" name="pwd" placeholder="8자 이상 영문, 숫자 조합"></input>
                    <p>비밀번호 확인</p>
                    <input type="password" name="pwd_check" placeholder="다시 한 번 입력해주세요"></input>
                    <p>이름</p>
                    <input type="text" name="name" placeholder="실명을 입력해주세요"></input>
                    <p>학번</p>
                    <input type="text" name="sid" placeholder="ex)20230000"></input>
                </form>
            </div>
            <button className='signBtn' onClick={()=>{navigate('/main')}}>
                덕타운 시작하기
            </button>
        </>
    );
}

export default SignUp;