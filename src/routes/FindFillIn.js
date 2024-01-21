import React, {useRef, useState} from 'react';
import Calendar from "react-calendar";
import { useNavigate } from 'react-router-dom';
import arrow_left from '../assets/arrow_left.png';
import Button from '../components/Button';
import moment from "moment";
import edit from '../assets/edit_blue.png'
import arrow_right from '../assets/arrow_right.png';
import '../css/FindFillIn.css';
import Modal from "react-modal";
import {customModal} from "../customModalConfig";

function FindFillIn() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function sendData() {

    }

    const [inputReason, setReason] = useState('');
    const inputRef = useRef(null);
    const handleReason = () => {
        setReason('');
        inputRef.current.focus();
    }

    const handleSelect = (date) => {
        if (selectedDate.some((d) => d.getTime() === date.getTime())) {
            const updateDate = selectedDate.filter((d) => d.getTime() !== date.getTime());
            setSelectedDate(updateDate);
        } else {
            setSelectedDate([...selectedDate, date]);
        }
    }

    const customDay = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const customNextLabel = (
        <img src={arrow_right} alt='next month' style={{width: '21px', height: '21px'}}/>
    );

    return (
        <>
            <div className='fillin_title_container'>
                <div className='fillin_title_left_content'>
                    <img className='title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>navigate('/unit')}/>
                    대타 구하기
                </div>
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
                        대타 요청을 보낼까요?
                        <div className="unit_modal_btn_container">
                            <Button styleClass="modal_btn_no" label="아니오" onClick={()=>setModalIsOpen(false)} />
                            <Button styleClass="modal_btn_yes" label="예" onClick={sendData()} />
                        </div>
                    </div>
                </Modal>
            </div>
            <form className="fillin_form">
                <div className="request_to">
                    <span>받는 사람:</span>
                    <select className="unit_member_select">
                        {data.map((item) => (
                            <option value={item.value}>{item.label}</option>
                        ))}
                    </select>
                </div>
                <div className="request_date_container">
                    날짜: <div className="findfillin_request_date">2023년 09월 18일</div> {/*이 날짜는 지정하는건지 뭔지 물어봐야 함*/}
                </div>
                <div className="fillin_reason_container">
                    <span>사유:</span>
                    <input type='text' className='fillin_reason_field' value={inputReason} onChange={(e) => setReason(e.target.value)} ref={inputRef}/>
                    <button type='button' className='edit_btn' onClick={handleReason}>
                        <img className="edit_icon" alt="수정" src={edit}/>
                    </button>
                </div>
                <div className="change_date">
                    상대와 바꿀 수 있는 날짜 선택:
                </div>
            </form>
            <div className="fillin_calendar">
                <Calendar
                    value={selectedDate}
                    onClickDay={handleSelect}
                    formatDay={(locale, date) => moment(date).format("DD")}
                    formatShortWeekday={(locale, date) => customDay[date.getDay()]}
                    next2Label={null}
                    nextLabel={customNextLabel}
                    prev2Label={null}
                    prevLabel={null}
                    tileClassName={({date, view}) => {
                        if (selectedDate.some((d) => d.getTime() === date.getTime())) {
                            return 'active';
                        }
                        return '';
                    }}
                />
            </div>
        </>
    );
}

export default FindFillIn;