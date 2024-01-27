import React, { useEffect, useState } from 'react';
import '../css/Sign.css';
import arrow_left from '../assets/arrow_left.png';
import { useNavigate } from 'react-router-dom';

function FindPassword() {
  const navigate = useNavigate();
  const serverUrl = process.env.REACT_APP_BASEURL;
  const [email, setEmail] = useState('');  // 이메일 값을 추적할 상태 추가
  const [checkedEmail, setCheckedEmail] = useState(false);

  // 계정 확인
  function checkAccount(event) {
    event.preventDefault();
    const apiUrl = serverUrl + "/auth/password";

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "email": email }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(errorResponse => {
            throw new EvalError(errorResponse.errorMessage);
          });
        } else {
          alert("사용중인 계정이 확인되었습니다");
          setCheckedEmail(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  // 새 비밀번호 발급
  function sendPassword(event) {
    event.preventDefault();
    const apiUrl = serverUrl + "/auth/password/reset";

    if (!checkedEmail) {
      alert('계정 확인 버튼을 눌러 계정 유무를 확인해주세요');
      return;
    }

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "email": email }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(errorResponse => {
            throw new EvalError(errorResponse.errorMessage);
          });
        } else {
          alert("이메일로 새로운 비밀번호가 발급되었습니다");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  useEffect(() => {
    setCheckedEmail(false);
  }, [email]); // email이 변경될 때만 useEffect 실행

  return (
    <>
      <div className="title_container">
        <div>
          <img className='backBtn' src={arrow_left} alt="뒤로가기" onClick={() => { navigate('/signin'); }}></img>
          비밀번호 찾기
        </div>
      </div>
      <form className="signin_form" onSubmit={sendPassword}>
        <div className='content_container'>
          <p>가입한 덕성 이메일</p>
          <div className='inputFlexContainer'>
            {/* onChange 이벤트를 통해 email 상태를 업데이트 */}
            <input className='noLineInput' type="text" name="id" placeholder="duktown@duksung.ac.kr" value={email} onChange={(e) => setEmail(e.target.value)} />
            <span id="inputCheckBtn" onClick={checkAccount}>계정 확인</span>
          </div>
        </div>
      </form>
      <button type="submit" className='bottomBtn'>
        이메일로 임시 비밀번호 보내기
      </button>
    </>
  );
}

export default FindPassword;
