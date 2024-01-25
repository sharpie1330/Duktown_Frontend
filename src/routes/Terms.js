import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import arrow_left from '../assets/arrow_left.png';
import '../css/Terms.css';

function Terms() {
    const { state } = useLocation();
    const termsTitle = {1: '덕타운 이용약관 동의', 2: '개인정보 수집 제공 동의'};
    const navigate = useNavigate();

    function checkAgreement() {
        // 약관 동의 반영
        if (state.terms === 1) {
            navigate('/signup', { state: { ...state, isFirstTermsChecked: true } });
        } else {
            navigate('/signup', { state: { ...state, isSecondTermsChecked: true } });
        }
    }

    return (
        <>
            <div className="title_container">
                <div>
                    <img className='backBtn' src={arrow_left} alt="뒤로 가기" onClick={() => navigate('/signup')}/>
                    {termsTitle[state.terms]}
                </div>
            </div>
            <div className='content_container'>
                {state.terms === 1 ?
                    <div>
                        <p>
                            “덕타운(DukTown)”은 이용자의 기숙사 생활에 관한 개인정보를 통해 서비스를 제공합니다. 
                            서비스 이용을 위한 최소한의 개인정보를 수집합니다. 
                            개인정보 수집 제공에 동의하지 않을 시 서비스 이용이 제한됩니다.
                        </p>
                        <p>
                            정보통신망법 규정에 따라 덕타운에 회원가입 신청하시는 분께 
                            수집하는 개인정보의 항목, 개인정보의 수집 및 이용 목적, 개인정보의 보유 및 이용기간을 안내 드리오니 
                            자세히 읽은 후 동의하여 주시기 바랍니다.
                        </p>
                        <div className='term-box'>
                            <p>
                                1. 수집하는 개인정보<br/>
                                - 덕성여대 이메일<br/>
                                - 이름 및 학번<br/>
                                - 기숙사 정보 (동, 호수 등 )<br/>
                                <br/>
                                2. 개인정보 이용 목적<br/>
                                - 기숙사 사생 인증<br/>
                                - 커뮤니티, 기숙사 청소 당번 등 서비스 제공<br/>
                                <br/>
                                3. 개인정보 보유 및 이용기간<br/>
                                - 가입 시 덕성 포털 이메일 및 아이디, 비밀번호 :<br/>
                                &nbsp;&nbsp;가입일자 기준 5년<br/>
                                - 2단계 사생 인증 및 관리자 인증 :<br/>
                                &nbsp;&nbsp;인증일자 기준 4개월
                            </p>
                        </div>
                        
                    </div>
                :
                    <div>
                        <p>
                            “덕타운(DukTown)”은 덕성여자대학교 기숙사 사생 및 학우들이 기숙사 생활을 효율적으로 할 수 있도록 올인원 서비스를 제공합니다.
                            본 서비스를 이용하기에 앞서 서비스 이용 약관에 동의가 필요하므로, 아래 덕타운 이용약관을 주의 깊게 살펴봐 주시기 바랍니다.
                        </p>
                        <div className='term-box'>
                            <ol>
                                <li>회원 가입 및 계정 관리</li>
                                <ul>
                                    <li>
                                        본 서비스는 덕성여대 학우들만이 이용할 수 있으므로 덕성여대 메일 인증이 필수적입니다. 덕성여대 메일을 보유하고 있지 않을 경우 회원가입이 제한됩니다.
                                        개인정보 수집•이용•보호 등에 대한 규정은 개인정보 수집 제공 동의에 자세히 안내되어 있으니 참고하시기 바랍니다.
                                    </li>
                                    <li>
                                        개인정보(기숙사 정보) 보안에 대한 책임은 덕타운 개발자 및 관리자에게 있습니다. 개인정보 유출 시 공지사항을 통한 안내 후 빠른 조치를 취할 것을 약속드립니다.
                                    </li>
                                    <li>
                                        타인의 계정 사용 적발 시 해당 계정은 즉시 정지 처리 됩니다.
                                    </li>
                                </ul>
                                <li>
                                서비스 이용 규칙
                                </li>
                                <ul>
                                    <li>
                                        덕타운은 기숙사 생활을 윤택하게 하는 서비스로서, 기존의 기숙사 규정 에 기반을 둡니다. 입사 신청•외박신청 및 수리요청은 기숙사 규정 준수가 우선되어야 하며 규정 위반에 대한 조치(벌점)은 책임지지 않습니다.
                                    </li>
                                    <li>
                                        덕타운은 덕우들이 함께 이용하는 공간으로, 타인에 대한 존중과 배려가 우선되어야 합니다.
                                    </li>
                                    <li>
                                        커뮤니티 이용 시 불법 콘텐츠 게시, 타인에 대한 욕설 및 비방, 사기 등 불미스러운 일을 발생시킬 경우 서비스 이용이 제한될 수 있습니다.
                                    </li>
                                    <li>
                                    이용자가 작성한 게시글이 신고 20회 이상 누적 시 해당 글은 삭제 처리 되고 커뮤니티 서비스 이용이 제한되며 유효기간은 2주입니다.
                                    </li>
                                    <li>
                                    배달팟 채팅 이용 중 신고 5회 이상 누적 시 채팅 서비스 이용이 제한되며 유효기간은 2주입니다.
                                    </li>
                                </ul>
                                <li>
                                서비스 변경 및 중단
                                </li>
                                <ul>
                                    <li>
                                        서비스 개선 및 버전 처리 시 운영이 일시 정지될 수 있습니다.
                                        서비스 중단 시, 중단 10일 이전부터 이용자에게 전체 공지사항으로 안내합니다.
                                    </li>
                                </ul>
                            </ol>
                        </div>
                    </div>
                } 
            </div>
            <button className='bottomBtn' onClick={checkAgreement}>
                동의하기
            </button>
        </>
    );
}

export default Terms;