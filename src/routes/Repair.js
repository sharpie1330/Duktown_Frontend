import React from 'react';
import arrow_left from '../assets/arrow_left.png';
import arrow_right from '../assets/arrow_right.png';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ListView from "../components/ListView";
import '../css/Repair.css';

function Repair(){
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault(); //submit 됐을 때 동작하는 함수
    }

    return (
        <>
            <div className='repair_title_container'>
                <img className='repair_title_icon' src={arrow_left} onClick={()=>{navigate('/main');}}/>
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
                            type="submit"
                        />
                    </div>
                </form>
                <div className='request_history'>
                    <div className="request_history_title">
                        수리 요청 내역
                        <img className='history_icon' src={arrow_right} onClick={()=>{navigate('/home');}}/> {/*나중에 수리 내역 페이지 연결*/}
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