import React, { useState, useRef, useEffect } from 'react';
import Calendar from "react-calendar";
import { useNavigate } from 'react-router-dom';
import arrow_left from '../assets/arrow_left.png';
import Button from '../components/Button';
import '../css/StayOut.css';
import moment from "moment";
import edit from '../assets/edit_blue.png'
import arrow_right from '../assets/arrow_right.png';

function Stayout() {
    const navigate = useNavigate();
    const [rangeStart, setRangeStart] = useState();
    const [rangeEnd, setRangeEnd] = useState();
    const [range, setRange] = useState(0);
    const handleDateChange = date => {
        const setStartDate = moment(date[0]).format('YYYY.MM.DD');
        const setEndDate = moment(date[1]).format('YYYY.MM.DD');

        setRangeStart(setStartDate);
        setRangeEnd(setEndDate);
    }

    useEffect(()=>{
        const rangeVal = new Date(rangeEnd) - new Date(rangeStart);
        setRange(rangeVal);
    }, [rangeStart, rangeEnd]);

    const [inputAddr, setAddr] = useState('');
    const inputRef1 = useRef(null);
    const handleAddr = () => {
        setAddr('');
        inputRef1.current.focus();
    }

    const [inputReason, setReason] = useState('');
    const inputRef2 = useRef(null);
    const handleReason = () => {
        setReason('');
        inputRef2.current.focus();
    }

    const customDay = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const customNextLabel = (
        <img src={arrow_right} alt='next month' style={{width: '21px', height: '21px'}}/>
    );

    return (
      <>
          <div className='stayout_title_container'>
              <div className='stayout_title_left_content'>
                  <img className='title_icon' src={arrow_left} onClick={()=>{navigate('/home');}}/>
                  대타 구하기
              </div>
              <Button
                  label="신청하기"
                  styleClass="blue_rec_btn"
                  type="submit"
              />
          </div>
          <div className="calendar">
              <Calendar
                  formatDay={(locale, date) => moment(date).format("DD")}
                  formatShortWeekday={(locale, date) => customDay[date.getDay()]}
                  onChange={handleDateChange}
                  selectRange={true}
                  next2Label={null}
                  nextLabel={customNextLabel}
                  prev2Label={null}
                  prevLabel={null}
              />
          </div>
          <form className="stayout_form">
              <div className="range_container">
                  외박 시작 날짜
                  <input type='text' className='input_text' value={rangeStart || ""} disabled={true}/>
                  돌아오는 날짜
                  <input type='text' className='input_text' value={rangeEnd || ""} disabled={true}/>
              </div>
              <div className="calculate_day">
                  외박 일 수
                  <input type='text' className='range_field' value={range/86400000 + '일'} disabled={true}/>
              </div>
              <div className="stayout_input_container">
                  머무르는 곳의 주소
                  <div className="stayout_addr_container">
                      <input type='text' className='stayout_addr_field' value={inputAddr} onChange={(e) => setAddr(e.target.value)} ref={inputRef1}/>
                      <button type='button' className='edit_btn' onClick={handleAddr}>
                          <img className="edit_icon" src={edit}/>
                      </button>
                  </div>
              </div>
              <div className="stayout_input_container">
                  사유
                  <div className="stayout_reason_container">
                      <input type='text' className='stayout_reason_field' value={inputReason} onChange={(e) => setReason(e.target.value)} ref={inputRef2}/>
                      <button type='button' className='edit_btn' onClick={handleReason}>
                          <img className="edit_icon" src={edit}/>
                      </button>
                  </div>
              </div>
          </form>
          <p className="stayout_description">
              *외박은 당일 22시 전까지만 신청 가능합니다.<br/>
              &nbsp;무단 외박 시 벌점 3점이 부과됩니다.<br/>
              &nbsp;새벽 1~5시 사이에 귀소시 벌점이 부과됩니다.
          </p>
      </>
    );
}

export default Stayout;