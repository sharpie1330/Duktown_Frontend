import React, {useContext, useState} from 'react';
import arrow_left from '../assets/arrow_left.png';
import unit_blue from '../assets/unit_blue.png';
import edit_blue from '../assets/edit_blue.png';
import comment from '../assets/comment.png';
import logout from '../assets/logout.png';
import { useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import AccessTokenContext from '../AccessTokenContext';
import {customModal} from '../customModalConfig';
import Button from "../components/Button";
import profile from "../assets/profile.png";
import arrow_right_blue from "../assets/arrow_right_blue.png";
import penalty from "../assets/penalty.png";
import warning from "../assets/warning.png";
import '../css/MyPage.css';

function MyPage() {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modal2IsOpen, setModal2IsOpen] = useState(false);
    const { accessToken } = useContext(AccessTokenContext);
    const serverUrl = 'http://localhost:8080';

    const logoutHandler = () => {
        setModalIsOpen(false);
        const apiUrl = serverUrl + '/auth/logout';
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                if (response.ok){
                    alert('정상적으로 로그아웃 되었습니다.');
                    return navigate('/');
                } else {
                    throw new Error(response.errorMessage);
                }
            })
            .catch((error) => {
                console.log(error.errorMessage);
                alert('페이지 로딩 중 오류가 발생했습니다.');
            });
    }

    return (
        <>
            <div className='myPage_title_container'>
                <img className='myPage_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/home');}}/>
                마이페이지
            </div>
            <div className='myPage_body_container'>
                <div className='myPage_profile'>
                    <div className='myPage_profile_info'>
                        {/*<div className='myPage_edit_profile_container'>
                            <span>프로필 편집</span>
                            <img className="myPage_profile_edit_btn" src={arrow_right_blue} alt="프로필 편집"/>
                        </div>*/}
                        <div className='myPage_profile_horizon_container'>
                            <div className='myPage_profile_img_container'>
                                <img className="myPage_profile_icon" src={profile} alt="프로필 사진"/>
                            </div>
                            <div className='myPage_profile_container'>
                                <p className='myPage_user_name'>전윤하</p>
                                <p className='myPage_user_email'>ariha1982@naver.com</p>
                                <p className='myPage_user_dorm'>가온1관 A동 202호</p>
                                <div className='myPage_user_role'>유닛장</div>
                            </div>
                        </div>
                    </div>
                    <div className='myPage_profile_status'>
                        사생 인증이 완료되었습니다.
                    </div>
                </div>
                <div className="myPage_list_container">
                    <ul className="myPage_list">
                        <li className="myPage_list_element" onClick={() => navigate('/user/unit')}>
                            <img id='myUnit' className="myPage_icon" src={unit_blue} alt="나의 유닛"/>
                            나의 유닛
                        </li>
                        <li className="myPage_list_element" onClick={() => navigate('/user/wrote/posts')}>
                            <img className="myPage_icon" id='myPosts' src={edit_blue} alt="내가 쓴 글"/>
                            내가 쓴 글
                        </li>
                        <li className="myPage_list_element" onClick={() => navigate('/user/wrote/comments')}>
                            <img className="myPage_icon" id='myComments' src={comment} alt="댓글 단 글"/>
                            댓글 단 글
                        </li>
                        <li className="myPage_list_element" onClick={() => navigate('/user/penalty')}>
                            <img className="myPage_icon" id='myPenalty' src={penalty} alt="벌점 관리"/>
                            벌점 관리
                        </li>
                        <li className="myPage_list_element" onClick={() => navigate('/dormGuide')}>
                            <img className="myPage_icon" id='dormGuid' src={warning} alt="기숙사 안내"/>
                            기숙사 생활 안내 / 안전관리 안내
                        </li>
                        <li className="myPage_list_element" onClick={() => setModalIsOpen(true)}>
                            <img className="myPage_icon" id='logout' src={logout} alt="로그아웃"/>
                            로그아웃
                        </li>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={()=>setModalIsOpen(false)}
                            style={customModal}>
                            <div className="unit_modal_container">
                                로그아웃 하시겠습니까?
                                <div className="unit_modal_btn_container">
                                    <Button styleClass="modal_btn_no" label="아니오" onClick={()=>setModalIsOpen(false)} />
                                    <Button styleClass="modal_btn_yes" label="예" onClick={logoutHandler}/>
                                </div>
                            </div>
                        </Modal>
                        <li className="myPage_list_element" onClick={() => setModal2IsOpen(true)}>
                            <img className="myPage_icon" id='logout' src={logout} alt="탈퇴"/>
                            회원 탈퇴
                        </li>
                        <Modal
                            isOpen={modal2IsOpen}
                            onRequestClose={()=>setModal2IsOpen(false)}
                            style={customModal}>
                            <div className="unit_modal_container">
                                덕타운에서 탈퇴할까요?
                                <div className="unit_modal_btn_container">
                                    <Button styleClass="modal_btn_no" label="아니오" onClick={()=>setModal2IsOpen(false)} />
                                    <Button styleClass="modal_btn_yes" label="예" onClick={() => alert('아직 탈퇴 기능이 없어요.')}/>
                                </div>
                            </div>
                        </Modal>
                    </ul>
                </div>
            </div>
            <div className='myPage_footer'>
                <p className='duksung_dorm_info'>덕성여자대학교 기숙사 정보</p>
                <p className='duksung_dorm_number'>02-901-8000</p>
                <p className='gaon_dorm_addr'>가온1,2관 : (01370) 서울특별시 도봉구 우이천로 381</p>
                <p className='international_dorm_addr'>국제기숙사 : (01378) 서울특별시 도봉구 우이천로 380</p>
            </div>
        </>
    )
}

export default MyPage;