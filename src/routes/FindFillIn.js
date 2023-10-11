import React, {useRef, useState, useEffect} from 'react';
import Calendar from "react-calendar";
import { useNavigate } from 'react-router-dom';
import arrow_left from '../assets/arrow_left.png';
import Button from '../components/Button';
import moment from "moment";
import edit from '../assets/edit_blue.png'
import arrow_right from '../assets/arrow_right.png';
import '../css/FindFillIn.css';

function FindFillIn() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    function handleDateChange() {

    }

    const [inputReason, setReason] = useState('');
    const inputRef = useRef(null);
    const handleReason = () => {
        setReason('');
        inputRef.current.focus();
    }

    const customDay = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const customNextLabel = (
        <img src={arrow_right} alt='next month' style={{width: '21px', height: '21px'}}/>
    );

    return (
        <>
            <div className='fillin_title_container'>
                <div className='fillin_title_left_content'>
                    <img className='title_icon' src={arrow_left} onClick={()=>{navigate('/main');}}/>
                    대타 구하기
                </div>
                <Button
                    label="보내기"
                    styleClass="blue_rec_btn"
                    type="submit"
                />
            </div>
            <form className="fillin_form">
                <div className="request_to">
                    받는 사람:
                    <select className="unit_member_select">
                        {data.map((item) => (
                            <option value={item.value}>{item.label}</option>
                        ))}
                    </select>
                </div>
                <div className="request_date_container">
                    날짜: <b className="request_date">2023년 09월 18일</b> {/*이 날짜는 지정하는건지 뭔지 물어봐야 함*/}
                </div>
                <div className="fillin_reason_container">
                    사유:
                    <input type='text' className='fillin_reason_field' value={inputReason} onChange={(e) => setReason(e.target.value)} ref={inputRef}/>
                    <button type='button' className='edit_btn' onClick={handleReason}>
                        <img className="edit_icon" src={edit}/>
                    </button>
                </div>
                <div className="change_date">
                    상대와 바꿀 수 있는 날짜 선택:
                </div>
            </form>
            <div className="calendar">
                <Calendar
                    formatDay={(locale, date) => moment(date).format("DD")}
                    formatShortWeekday={(locale, date) => customDay[date.getDay()]}
                    onChange={handleDateChange}
                    next2Label={null}
                    nextLabel={customNextLabel}
                    prev2Label={null}
                    prevLabel={null}
                />
            </div>
        </>
    );
}

export default FindFillIn;