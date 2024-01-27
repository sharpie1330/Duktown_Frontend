import React, {useEffect, useState} from 'react';
import arrow_left from '../assets/arrow_left.png';
import unit_blue from '../assets/unit_blue.png';
import edit_blue from '../assets/edit_blue.png';
import comment_blue from '../assets/comment_blue.png';
import logout from '../assets/logout.png';
import { useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import {customModal} from '../customModalConfig';
import Button from "../components/Button";
import profile from "../assets/profile.png";
import penalty from "../assets/penalty.png";
import warning from "../assets/warning.png";
import '../css/MyPage.css';
import loggedIn from "../utils";

function MyPage() {
    const navigate = useNavigate();
    //유저
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [roleType, setRoleType] = useState('');
    const [hallName,  setHallName] = useState('');
    const [roomNumber, setRoomNumber] = useState(null);
    const [unitUserType, setUnitUserType] = useState('');
    const [buildingNumber, setBuildingNumber] = useState(1);
    const hall = {'GAON1': '가온1관', 'GAON2': '가온2관', 'INTERNATIONAL':'국제기숙사'};
    //모달
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modal2IsOpen, setModal2IsOpen] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const serverUrl = process.env.REACT_APP_BASEURL;

    useEffect( () => {
        if(!loggedIn()){
            alert('로그인이 필요합니다');
            navigate('/signin');
        }

        const profileUrl = serverUrl + '/my';
        fetch(profileUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    return response.json().then(errorData => {
                        if (errorData.errorMessage && (errorData.errorMessage.includes('Token') || errorData.errorMessage === undefined)) {
                            window.open('http://localhost:3000/signin', '_self');
                        } else {
                            throw new EvalError(errorData.errorMessage);
                        }
                    });
                }
            })
            .then((data) => {
                console.log(data);
                setUsername(data.name);
                setEmail(data.email);
                setRoleType(data.roleType);
                setHallName(hall[`${data.hallName}`]);
                setBuildingNumber(data.buildingNumber);
                setRoomNumber(data.roomNumber);
                setUnitUserType(data.unitUserType);
            })
            .catch((errorResponse) => {
                alert(errorResponse);
            });
    }, []);

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
                    localStorage.clear();
                    alert('정상적으로 로그아웃 되었습니다.');
                    return navigate('/');
                } else {
                    return response.json().then(errorData => {
                        if (errorData.errorMessage && (errorData.errorMessage.includes('Token') || errorData.errorMessage === undefined)) {
                            window.open('http://localhost:3000/signin', '_self');
                        } else {
                            throw new EvalError(errorData.errorMessage);
                        }
                    });
                }
            })
            .catch((errorResponse) => {
                alert(errorResponse);
            });
    }

    const withdrawalHandler = () => {
        setModal2IsOpen(false);
        const apiUrl = serverUrl + '/auth/withdrawal';
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                if (response.ok){
                    localStorage.clear();
                    alert('즐겨주셔서 감사합니다. 더 발전해서 돌아오겠습니다!');
                    return navigate('/');
                } else {
                    return response.json().then(errorData => {
                        if (errorData.errorMessage && (errorData.errorMessage.includes('Token') || errorData.errorMessage === undefined)) {
                            window.open('http://localhost:3000/signin', '_self');
                        } else {
                            throw new EvalError(errorData.errorMessage);
                        }
                    });
                }
            })
            .catch((errorResponse) => {
                alert(errorResponse);
            });
    }

    return (
        <>
            <div className='title_container'>
                <div>
                    <img className='myPage_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/home');}}/>
                    마이페이지
                </div>
            </div>
            <div className='myPage_body_container'>
                <div>
                    <div className='myPage_profile_outer_container'>
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
                                        <p className='myPage_user_name'>{username}</p>
                                        <p className='myPage_user_email'>{email}</p>
                                        <p className='myPage_user_dorm'>{`${hallName} A동 ${roomNumber}호`}</p>
                                        {unitUserType === 'UNIT_LEADER' ? <div className='myPage_user_role'>유닛장</div> : <></>}
                                    </div>
                                </div>
                            </div>
                            {
                                roleType === 'DORM_STUDENT'
                                    ? <div className='myPage_profile_status'>
                                        사생 인증이 완료되었습니다.
                                    </div>
                                    : <div className='myPage_profile_status_require'>
                                        사생 인증을 해주세요.
                                    </div>
                            }
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
                                <img className="myPage_icon" id='myComments' src={comment_blue} alt="댓글 단 글"/>
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
                                        <Button styleClass="modal_btn_yes" label="예" onClick={withdrawalHandler}/>
                                    </div>
                                </div>
                            </Modal>
                        </ul>
                    </div>
                </div>
                <div className='myPage_footer'>
                    <div className='myPage_footer_mini_container'>
                        <span>문의</span>
                        <p> | duktown.official@gmail.com</p>
                    </div>
                    <p className='duksung_dorm_info'>덕성여자대학교 기숙사 정보</p>
                    <p className='duksung_dorm_number'>02-901-8000</p>
                    <p className='gaon_dorm_addr'>가온1,2관 : (01370) 서울특별시 도봉구 우이천로 381</p>
                    <p className='international_dorm_addr'>국제기숙사 : (01378) 서울특별시 도봉구 우이천로 380</p>
                </div>
            </div>
        </>
    )
}

export default MyPage;