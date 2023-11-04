import React, {useState} from 'react';
import arrow_left from '../assets/arrow_left.png';
import arrow_right from '../assets/arrow_right.png';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ListView from "../components/ListView";
import '../css/Repair.css';
import Modal from "react-modal";

function Repair(){
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const customModal = {
        overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            zIndex: "10",
            position: "fixed",
            top: "0",
            left: "0",
        },
        content: {
            width: "248px",
            height: "152px",
            zIndex: "150",
            padding: "0",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
            backgroundColor: "white",
            overflow: "auto",
        }
    }

    function sendData() {

    }
    const submitHandler = async (e) => {
        e.preventDefault(); //submit 됐을 때 동작하는 함수
    }

    return (
        <>
            <div className='repair_title_container'>
                <img className='repair_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/main');}}/>
                수리 요청
            </div>
            <div className='content-container'>
                <form onSubmit={submitHandler} className='request_container'>
                    <div className="repair_horizontal_container">
                        <div className='repair_dorm_select_container'>
                            건물명
                            <form action='#'>
                                <select name='dorm' className='repair_dorm_select'>
                                    <option value='가온1관'>가온1관</option>
                                    <option value='가온2관'>가온2관</option>
                                    <option value='국제관'>국제관</option>
                                </select>
                            </form>
                        </div>
                        <div className='repair_room_input'>
                            호실<br/>
                            <input type='text' className='repair_input_text'/>
                        </div>
                    </div>
                    <div className='repair_name_input'>
                        이름<br/>
                        <input type='text' className='repair_input_text'/>
                    </div>
                    <div className='repair_content_input'>
                        수리 내용<br/>
                        <textarea className='repair_content_textarea'/>
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
                            style={customModal}> {/*추후 api로 연결*/}
                            <div className="unit_modal_container">
                                수리 요청을 보낼까요?
                                <div className="unit_modal_btn_container">
                                    <Button styleClass="modal_btn_no" label="아니오" onClick={()=>setModalIsOpen(false)} />
                                    <Button styleClass="modal_btn_yes" label="예" onClick={sendData()} />
                                </div>
                            </div>
                        </Modal>
                    </div>
                </form>
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