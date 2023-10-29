import React, { useState, useEffect } from 'react';
import '../css/Sign.css';
import arrow_left from '../assets/arrow_left.png';
import file from '../assets/file.png';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState('terms'); // 초기 페이지: 약관 동의
    
    // useEffect를 사용하여 DOM 요소에 접근
    useEffect(() => {
        // DOM 요소에 접근
        const allTermsCheckbox = document.querySelector('#allTermsCheckbox');
        const personalInfoCheckbox = document.querySelector('#personalInfoCheckbox');
        const thirdPartyInfoCheckbox = document.querySelector('#thirdPartyInfoCheckbox');

        // 이용약관 전체 동의 체크박스가 변경될 때 이벤트 리스너 추가
        if (allTermsCheckbox) {
        allTermsCheckbox.addEventListener('change', function() {
            const isChecked = allTermsCheckbox.checked;
            personalInfoCheckbox.checked = isChecked;
            thirdPartyInfoCheckbox.checked = isChecked;
        });
        }
    }, []);

    const renderPage = () => {
        switch (currentPage) {
            case 'terms':
                return (
                    <>
                        <div className="signup_content">
                            <div className='term_title'>
                                <p className='blue_title'>반가워요!</p> 
                                <p className='blue_title'>덕타운에 입주하려면</p>
                                <p className='blue_title'>약관 동의가 필요해요</p>
                            </div>
                            <form className="term_check">
                                <div className='term_line'>
                                    <span className='term_big'>이용약관 전체 동의</span>
                                    <input className='round_checkbox' id="allTermsCheckbox" type='checkbox'></input>
                                </div>
                                <hr></hr>
                                <div className='term_line'>
                                    <span className='term_small'>개인정보 수집제공 동의 </span>
                                    <span className='blue_text'>필수</span>
                                    <input className='round_checkbox' id="personalInfoCheckbox" type='checkbox'></input>
                                </div>
                                <div className='term_line'>
                                    <span className='term_small'>제 3자 정보제공 동의 </span>
                                    <span className='blue_text'>필수</span>
                                    <input className='round_checkbox' id="thirdPartyInfoCheckbox" type='checkbox'></input>
                                </div>
                            </form>
                            
                            {/* 회원가입 하기 버튼을 누르면 setCurrentPage('email')를 호출하여 페이지를 변경 */}
                            
                        </div>
                        <button className='bottomBtn' onClick={() => setCurrentPage('email')}>회원가입 하기</button>
                    </>

                );
            case 'email':
                return (
                    <div className="signup_content">
                        <p className='blue_title'>덕우만 입주할 수 있어요!</p>
                        <p className='gray_title'>덕성 이메일 인증이 필요해요.</p>
                        <br/><br/>
                        <form className="signup_form">
                            <p>덕성 이메일</p>
                            <input type="email" placeholder='duktown@duksung.ac.kr'></input>
                        </form>
                        
                    {/* 이메일 인증 완료 시 setCurrentPage('authentication')를 호출하여 페이지를 변경 */}
                    <button className='emailAuthBtn' onClick={() => setCurrentPage('signup')}>이메일로 인증 보내기</button>
                    </div>
                );
                case 'signup':
                    return (
                        <>
                            <div className="title_container">
                                <img className='backBtn' src={arrow_left} onClick={() => setCurrentPage('email')}></img>
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
                                </form>
                            </div>
                            <button className='bottomBtn' onClick={() => setCurrentPage('authentication')} >
                                덕타운 시작하기
                            </button>
                        </>
                    );
            case 'authentication':
                return (
                    <>
                        <div className="title_container">
                            <img className='backBtn' src={arrow_left} onClick={() => setCurrentPage('signup')}></img>
                            사생 인증
                        </div>
                        <div className='content_container'>
                            <p className='blue_title'>사생 인증 후 더 많은</p>
                            <p className='blue_title'>서비스를 즐기실 수 있어요</p>
                            <p className='gray_title'>인증 처리는 약 1일~3일 소요돼요</p>  
                            <br/>
                            <form className="signup_form">
                                <p>이름</p>
                                <input type="text" name="name" placeholder="실명을 입력해주세요"></input>
                                <p>학번</p>
                                <input type="text" name="sid" placeholder="ex) 20230000"></input>
                                <p>기숙사 정보</p>
                                <div className='dormInfo'>
                                    <select name='dorm' className='dorm_select'>
                                        <option value='가온1관'>가온1관</option>
                                        <option value='가온2관'>가온2관</option>
                                        <option value='국제관'>국제관</option>
                                    </select>
                                    <input className='input_box' type="text" name="roomNumber"></input>
                                    <span>호</span>
                                </div>
                                <br/>
                                <p>덕성 포털 스크린 샷</p>
                                <div className='screenShot'>
                                    <img src={file}/>
                                </div>
                                    <div className='screenShotInstruction'>
                                    <p className='grayText'>덕성여대 포털시스템 &gt; 통합정보시스템 &gt; 학적 &gt; 개인정보변경 스크린 샷</p>
                                    <p className='blueText'>이름, 학번, 기숙사 정보가 모두 들어간 사진만 인증 가능</p>
                                    <p className='blueText'>입력한 이름, 학번, 기숙사 정보와 첨부 사진 속 정보가 일치해야 인증 가능</p>
                                </div>
                            </form>
                        </div>
                        <button className='bottomBtn' onClick={()=>{navigate('/main')}}>
                        사생 인증하기
                        </button>
                    </>
                );
                default:
            return null;
        }
    };
    return (
        <>
            {renderPage()}
        </>
    );
}
export default SignUp;