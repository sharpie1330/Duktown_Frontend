import React, {useState, useContext} from 'react';
import arrow_left from '../assets/arrow_left.png';
import arrow_right from '../assets/arrow_right.png';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ListView from "../components/ListView";
import '../css/Repair.css';
import Modal from "react-modal";
import AccessTokenContext from '../AccessTokenContext';
import customModal from '../customModalConfig';

function Repair(){
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { accessToken } = useContext(AccessTokenContext);
    const [hallName, setHallName] = useState("");
    const [room, setRoom] = useState("");
    const [content, setContent] = useState("");
    const [history, setHistory] = useState(null);

    const serverUrl = "http://localhost:8080";
    /* 화면 렌더링 시 get으로 수리요청 목록 가져오기
    useEffect(() => {
        const apiUrl = serverUrl + "/repairApply";
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }})
            .then((response) => {
                if (response.ok)
                    return response;
                else
                    throw new Error(response.errorMessage);
            })
            .then((dataArr) => {
                setHistory(dataArr);
            })
    }, []);*/
    const submitHandler = async () => {
        const apiUrl = serverUrl + "/repairApply";

        const requestData = {
            "hallName": hallName,
            "unit": room + "호",
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
                if (response.ok)
                    return response; //TODO: response를 json 형식으로 주시는지 확인 필요
                else
                    throw new Error(response.errorMessage);
            })
            .then(() => {
                window.location.reload();
                setModalIsOpen(false);
                alert("수리요청이 전송되었습니다.");
            })
            .catch((error) => {
                console.error(error.errorMessage);
                setModalIsOpen(false);
                alert(error.errorMessage);
            });
    }

    return (
        <>
            <div className='repair_title_container'>
                <img className='repair_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/main');}}/>
                수리 요청
            </div>
            <div className='content-container'>
                <div className='request_container'>
                    <div className='repair_dorm_select_container'>
                        건물명<br/>
                        <select name='dorm' className='repair_dorm_select' onChange={(e) => setHallName(e.target.value)}>
                            <option value='1'>가온1관</option>
                            <option value='2'>가온2관</option>
                            <option value='0'>국제관</option>
                        </select>
                    </div>
                    <div className='repair_room_input'>
                        호실<br/>
                        <input type='text' name="request_user" className='repair_input_text' onChange={(e) => setRoom(e.target.value)}/>
                    </div>
                    <div className='repair_content_input'>
                        수리 내용<br/>
                        <textarea name="content" className='repair_content_textarea' onChange={(e) => setContent(e.target.value)}/>
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
                <div className='request_history'>
                    <div className="request_history_title">
                        수리 요청 내역
                        <img className='history_icon' src={arrow_right} alt="수리 요청 내역 보기" onClick={()=>{navigate('/home');}}/> {/*나중에 수리 내역 페이지 연결*/}
                    </div>
                    <div className='history_container'>
                        <ListView
                            items = {[{ id:1, text: 'ex1'}, { id:2, text:'ex2'}]}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Repair;