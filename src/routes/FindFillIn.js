import React, {useEffect, useRef, useState} from 'react';
import Calendar from "react-calendar";
import {useNavigate} from 'react-router-dom';
import arrow_left from '../assets/arrow_left.png';
import Button from '../components/Button';
import moment from "moment";
import edit from '../assets/edit_blue.png'
import arrow_right from '../assets/arrow_right.png';
import '../css/FindFillIn.css';
import Modal from "react-modal";
import {customModal} from "../customModalConfig";
import loggedIn from "../utils";

function FindFillIn() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [requestDate, setRequestDate] = useState('');
    const [unit, setUnit] = useState([]);
    const [memberId, setMemberId] = useState(null);
    const [memberDate, setMemberDate] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const serverUrl = process.env.REACT_APP_BASEURL;

    function sendData() {
        setSelectedDate([]);
        setReason('');
        setRequestDate('');
        alert('대타 신청이 정상적으로 보내졌습니다.');
        setModalIsOpen(false);
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

    useEffect(() => {
        if(!loggedIn()){
            alert('로그인이 필요합니다');
            navigate('/signin');
        }

        fetch(serverUrl+'/cleaning/unit', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                if (response.ok)
                    return response.json();
                else {
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
                setUnit(data.unit);
            })
            .catch((errorResponse) => {
                alert(errorResponse);
            });
    }, []);

    const handleSelectUser = (event) => {
        const unitMemberId = event.target.value;
        setMemberId(unitMemberId);
    }

    useEffect(() => {
        const memberScheduleApiUrl = serverUrl+`/cleaning/${memberId}/schedule`;

        if (memberId !== null) {
            fetch(memberScheduleApiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    if (response.ok)
                        return response.json();
                    else {
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
                    console.log(data.date);
                    setMemberDate(data.date);
                })
                .catch((errorResponse) => {
                    alert(errorResponse);
                });
        }
    }, [memberId]);

    const dateString = () => {
        return selectedDate.map((date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`).join(', ')
    }

    useEffect(() => {
        dateString();
    }, [selectedDate]);

    return (
        <>
            <div className='title_container'>
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
                            <Button styleClass="modal_btn_yes" label="예" onClick={sendData} />
                        </div>
                    </div>
                </Modal>
            </div>
            <form className="fillin_form">
                <div className="request_to">
                    <span>받는 사람:</span>
                    <select className="unit_member_select" onChange={handleSelectUser}>
                        {unit.map((item) => (
                            <option value={item.userId}>{item.userName}</option>
                        ))}
                    </select>
                </div>
                <div className="request_date_container">
                    날짜: <input className="findfillin_request_date" type='date' value={requestDate} onChange={(e) => setRequestDate(e.target.value)}/>
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
                    <div className='selectedDate'>
                        {dateString()}
                    </div>
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

                        if (memberDate.find((day) => day.cleaningDate === moment(date).format('YYYY-MM-DD'))){
                            return 'highlight';
                        }
                        return '';
                    }}
                />
            </div>
        </>
    );
}

export default FindFillIn;