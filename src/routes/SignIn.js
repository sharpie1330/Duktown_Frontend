import React from 'react';
import { useNavigate } from 'react-router-dom';
import arrow_left from '../assets/arrow_left.png';
import '../css/Sign.css';

function SignIn(){
    const navigate = useNavigate();
    const serverUrl = process.env.REACT_APP_BASEURL;

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
            headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
            body: JSON.stringify(userData),
        };

        fetch(apiUrl, request)
            .then((response) => {
                if(!response.ok){
                    return response.json().then(errorResponse => {
                        throw new EvalError(errorResponse.errorMessage);
                    });
                }
                return response.json();
            })
            .then(data => {
                const roleType =data.roleType;
                const accessToken = data.accessToken;
                const refreshToken = data.refreshToken;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('timeStamp', new Date().getTime());
                localStorage.setItem('recentCategory', accessToken);
                navigate('/home');
            })
            .catch((error) => {
                alert(error);
            });
    }

    return(
        <>
            <div className="title_container">
                <img className='backBtn' src={arrow_left} alt="뒤로가기" onClick={()=>{navigate('/');}}></img>
                로그인
            </div>
            <form className="signin_form" id="signin_form" onSubmit={handleSignIn}>
                <p>아이디</p>
                <input className="sign_input" type="text" name="id" placeholder="6~12자 영문, 숫자 조합"/>
                <br/>
                <p>비밀번호</p>
                <input className="sign_input" type="text" name="pwd" placeholder="8자 이상 영문, 숫자 조합"/>
                <div className='otherLink'>
                    <span className='black_link' onClick={() => navigate('/findid')}>아이디 찾기</span>|
                    <span className='black_link' onClick={() => navigate('/findpassword')}>비밀번호 찾기</span>|                        <span className='blue_link' onClick={() => navigate('/signup')}>회원가입</span>
                </div>
            </form>
            <button type="submit" className='bottomBtn' form='signin_form'>
                로그인하기
            </button>
        </>
    )
}

export default SignIn;