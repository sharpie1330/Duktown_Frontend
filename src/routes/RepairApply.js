import React, {useState, useEffect} from 'react';
import arrow_left from '../assets/arrow_left.png';
import arrow_right from '../assets/arrow_right.png';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import '../css/RepairApply.css';
import Modal from "react-modal";
import {customModal} from "../customModalConfig";
import loggedIn from '../utils';

function RepairApply(){
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const [hallName, setHallName] = useState("1");
    const [position, setPosition] = useState("");
    const [content, setContent] = useState("");

    useEffect( () => {
        if (accessToken === '' || accessToken === undefined || accessToken === null) {
            navigate('/signin');
        }
    }, []);

    const serverUrl = "http://localhost:8080";
    const submitHandler = async () => {

        // 유효한 토큰이 없을 경우 로그인 페이지로 이동
        if(!loggedIn()){
            alert('로그인이 필요합니다');
            navigate('/signin');
        }

        const apiUrl = serverUrl + "/repairApply";

        const requestData = {
            "hallName": hallName,
            "position": position,
            "content": content
        }

        console.log(requestData);

        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestData),
        }

        fetch(apiUrl, request)
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    return response;
                } else {
                    return response.then(errorData => {
                        if (errorData.errorMessage && (errorData.errorMessage.includes('Token') || errorData.errorMessage === undefined)) {
                            window.open('http://localhost:3000/signin', '_self');
                        } else {
                            throw new EvalError(errorData.errorMessage);
                        }
                    });
                }
            })
            .then((data) => {
                if (data) {
                    // 서버에서 JSON 형식의 응답을 제공할 때만 실행
                    setModalIsOpen(false);
                    alert("수리요청이 전송되었습니다.");
                    navigate('/repairs/historys');
                }
            })
            .catch((error) => {
                alert(error);
                setModalIsOpen(false);
            });


    }

    return (
        <>
            <div className='repair_title_container'>
                <div className='repair_title'>
                    <img className='repair_title_icon' src={arrow_left} alt="뒤로 가기" onClick={() => {navigate('/repairs/historys')}}/>
                    수리 요청
                </div>
                <div className="submitBtn">
                    <Button
                        label="보내기"
                        styleClass="blue_rec_btn"
                        onClick={() => setModalIsOpen(true)}
                    />
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={()=>setModalIsOpen(false)}
                        style={customModal}>
                        <div className="unit_modal_container">
                            수리 요청을 보낼까요?
                            <div className="unit_modal_btn_container">
                                <Button styleClass="modal_btn_no" label="아니오" onClick={()=>setModalIsOpen(false)} />
                                <Button styleClass="modal_btn_yes" label="예" onClick={submitHandler}/>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className='content-container'>
                <div className='request_container'>
                    <div className='request_horizontal_container'>
                        <div className='repair_dorm_select_container'>
                            건물명<br/>
                            <select name='dorm' className='repair_dorm_select' onChange={(e) => setHallName(e.target.value)}>
                                <option value='1'>가온1관</option>
                                <option value='2'>가온2관</option>
                                <option value='0'>국제관</option>
                            </select>
                        </div>
                        <div className='repair_room_input'>
                            위치<br/>
                            <input type='text' name="request_user" className='repair_input_text' onChange={(e) => setPosition(e.target.value)}/>
                        </div>
                    </div>
                    {/*<div className='repair_user_profile'>
                        <input className='round_checkbox' id="userProfile" type='checkbox'/>
                        <span className="user_profile">내 기숙사 정보 입력하기</span>
                    </div>*/}
                    <div className='repair_content_input'>
                        <textarea name="content" className='repair_content_textarea' placeholder='수리를 요청할 사항을 입력하세요.' onChange={(e) => setContent(e.target.value)}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RepairApply;