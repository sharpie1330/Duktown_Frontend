import React from 'react';
import { useNavigate } from 'react-router-dom';
import arrow_left from '../assets/arrow_left.png';
import '../css/Terms.css';

function ApplicationTerms() {
    const navigate = useNavigate();

    return (
        <>
            <div className="title_container">
                    <img className='backBtn' src={arrow_left} alt="뒤로 가기" onClick={() => navigate('/home')}/>
                    덕타운 이용약관
            </div>
            <div className='content_container'>
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
        </>
    )
}

export default ApplicationTerms;