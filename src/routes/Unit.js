import React, {useEffect, useState} from 'react';
import Button from "../components/Button";
import arrow_right from "../assets/arrow_right.png";
import { useNavigate } from 'react-router-dom';
import ListView from "../components/ListView";
import Modal from 'react-modal'
import "../css/Unit.css";
import {customModal} from "../customModalConfig";
import Upperbar from '../components/UpperBar';
import BottomBar from '../components/BottomBar';

function Unit() {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [history, setHistory] = useState([]);
    const [isCleaningDay, setIsCleaningDay] = useState(false);
    const [cleaningId, setCleaningId] = useState(null);
    const accessToken = localStorage.getItem('accessToken');
    const serverUrl = 'http://localhost:8080';

    function formatToday(date) {
        const weekday = ['일', '월', '화', '수', '목', '금', '토'];
        return date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate()+'. ('+weekday[date.getDay()]+')';
    }

    function sendData(){
        const apiUrl = serverUrl + `/cleaning/${cleaningId}`;

        const request = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                "cleaningId": cleaningId
            }),
        }

        fetch(apiUrl, request)
            .then((response) => {
                console.log(response);
                if (response.ok)
                    return response;
                else {
                    if (response.errorMessage.includes('Token') || response.errorMessage === undefined) {
                        window.open('http://localhost:3000/signin', '_self');
                    } else {
                        throw new EvalError(response.errorMessage);
                    }
                }
            })
            .then(() => {
                setModalIsOpen(false);
                alert("청소완료 처리되었습니다.");
            })
            .catch((errorResponse) => {
                console.error(errorResponse);
                setModalIsOpen(false);
                if (errorResponse.errorMessage.includes('Token') || errorResponse.errorMessage === undefined) {
                    window.open('http://localhost:3000/signin', '_self');
                } else {
                    throw new EvalError(errorResponse.errorMessage);
                }
            });
    }

    {/*이번 주 날짜 배열 구하기*/}
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let day = today.getDay();
    if (day === 0) {
        day = 6;
    } else {
        day -= 1;
    }
    let week = []
    let startAndEnd = [];
    for (let i = 0; i < 7; i++) {
        let newDate = new Date(today.valueOf() + 86400000 * (i - day));
        week.push([i, newDate.getDate()])
        if (i === 0 || i === 6) {
            startAndEnd.push(new Date(today.valueOf() + 86400000 * (i - day)));
        }
    }

    const format_today = formatToday(now);

    {/*예시*/}
    const done = false;
    const confirm = false;
    const dummyData = [
        {cleaningDate: '2024-01-25', cleaned: false, checked: false},
        {cleaningDate: '2024-01-18', cleaned: true, checked: true},
        {cleaningDate: '2024-01-11', cleaned: true, checked: true},
        {cleaningDate: '2024-01-04', cleaned: true, checked: true},
    ]
    useEffect(() => {
        if (accessToken === '' || accessToken === undefined || accessToken === null) {
            navigate('/signin');
        }

        const start = new Date(startAndEnd[0]);
        const end = new Date(startAndEnd[1]);

        let formatedStartDate;
        if (start.getMonth()+1 < 10) {
            formatedStartDate = `${start.getFullYear()}-0${start.getMonth()+1}-${start.getDate()}`;
        } else {
            formatedStartDate = `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}`;
        }
        let formatedEndDate;
        if (start.getMonth()+1 < 10) {
            formatedEndDate = `${end.getFullYear()}-0${end.getMonth()+1}-${end.getDate()}`;
        } else {
            formatedEndDate = `${end.getFullYear()}-${end.getMonth()+1}-${end.getDate()}`;
        }
        fetch(serverUrl+`/cleaning/schedule?startDate=${formatedStartDate}&endDate=${formatedEndDate}`, {
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
                    if (response.errorMessage.includes('Token') || response.errorMessage === undefined) {
                        window.open('http://localhost:3000/signin', '_self');
                    } else {
                        new EvalError(response.errorMessage);
                    }
                }
            })
            .then((data) => {
                setSchedule(data.data);
            })
            .catch((errorResponse) => {
                if (errorResponse.errorMessage.includes('Token') || errorResponse.errorMessage === undefined) {
                    window.open('http://localhost:3000/signin', '_self');
                } else {
                    throw new EvalError(errorResponse.errorMessage);
                }
            });

        fetch(serverUrl+'/cleaning', {
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
                    if (response.errorMessage.includes('Token') || response.errorMessage === undefined) {
                        window.open('http://localhost:3000/signin', '_self');
                    } else {
                        new EvalError(response.errorMessage);
                    }
                }
            })
            .then((data) => {
                setHistory(data.content);
            })
            .catch((errorResponse) => {
                console.log(errorResponse);
                if (errorResponse.errorMessage.includes('Token') || errorResponse.errorMessage === undefined) {
                    window.open('http://localhost:3000/signin', '_self');
                } else {
                    throw new EvalError(errorResponse.errorMessage);
                }
            });
    }, []);

    let isExist = []
    week.map(([_, day]) => {
        isExist.push(schedule.some(data => (new Date(data.cleaningDate)).getDate() === parseInt(day)));
    })

    useEffect(() => {
        if (schedule.length > 0 || schedule.some((day) => isToday(day.cleaningDate))) {
            setIsCleaningDay(true);
        } else {
            setIsCleaningDay(false);
        }
    }, [schedule])

    function isToday(date) {
        const today = new Date();
        let formatedDate;
        if (today.getMonth() + 1 < 10) {
            formatedDate = `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()}`
        } else {
            formatedDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
        }
        return (
            date === formatedDate
        );
    }

    return (
        <>
            <Upperbar searchAvailable={false}/>
            <div className='center_content_container'>
                <div className="unit_body_container">
                    <div className="weekly_schedule">
                        <p className="year_and_month">{now.getFullYear() + '년 ' + (now.getMonth()+1) + '월'}</p>
                        <div className="unit_weekly_calendar">
                            <div className="unit_weekly_calendar__weekdays">
                                <div className="unit_weekly_calendar__weekdays__weekday">
                                    <abbr className="unit_abbr" aria-label="월요일" title="월요일">월</abbr>
                                </div>
                                <div className="unit_weekly_calendar__weekdays__weekday">
                                    <abbr className="unit_abbr" aria-label="화요일" title="화요일">화</abbr>
                                </div>
                                <div className="unit_weekly_calendar__weekdays__weekday">
                                    <abbr className="unit_abbr" aria-label="수요일" title="수요일">수</abbr>
                                </div>
                                <div className="unit_weekly_calendar__weekdays__weekday">
                                    <abbr className="unit_abbr" aria-label="목요일" title="목요일">목</abbr>
                                </div>
                                <div className="unit_weekly_calendar__weekdays__weekday">
                                    <abbr className="unit_abbr" aria-label="금요일" title="금요일">금</abbr>
                                </div>
                                <div className="unit_weekly_calendar__weekdays__weekday">
                                    <abbr className="unit_abbr" aria-label="토요일" title="토요일">토</abbr>
                                </div>
                                <div className="unit_weekly_calendar__weekdays__weekday">
                                    <abbr className="unit_abbr" aria-label="일요일" title="일요일">일</abbr>
                                </div>
                            </div>
                            <div className="unit_weekly_calendar__weekdays__exist">
                                {isExist.map((exist) => (
                                    <div className={`unit_weekly_calendar__weekdays__weekday__exist ${ exist ? 'exist' : 'gone'}`}>
                                        <span className="circle" />
                                    </div>
                                ))}
                            </div>
                            <div className="unit_weekly_calendar__weekdays__num">
                                {week.map(([index, day]) => (
                                    <div className={`unit_weekly_calendar__weekdays__weekday__num ${day === now.getDate() ? 'today' : '' }`}>
                                        <abbr aria-label={`날짜${index+1}`} title={`날짜${index+1}`}>{day}</abbr>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="unit_today_record_container">
                        <div className="unit_date_container">
                            <p className="unit_today_date">{format_today}</p>
                            {/*<img className="move_icon" src={arrow_right} alt="어딘가로 이동" onClick={()=>{navigate("/home");}}/>*/}
                        </div>
                        <div className="today_record_container">
                            <div className="user_info">101호 정현조</div>
                            <div className="user_cleaning_time">23:30 ~ 24:00</div>
                            <div className="done_and_confirm">
                                {isCleaningDay
                                ?
                                    <>
                                        <div className="unit_done">
                                            { done
                                                ? <Button styleClass="done_true" label="완료"/>
                                                : <Button styleClass="done_false" label="완료하기" onClick={()=> setModalIsOpen(true)}/>
                                            }
                                            <Modal
                                                isOpen={modalIsOpen}
                                                onRequestClose={()=>setModalIsOpen(false)}
                                                style={customModal}>
                                                <div className="unit_modal_container">
                                                    청소를 완료하시겠습니까?
                                                    <div className="unit_modal_btn_container">
                                                        <Button styleClass="modal_btn_no" label="아니오" onClick={()=>setModalIsOpen(false)} />
                                                        <Button styleClass="modal_btn_yes" label="예" onClick={() => sendData()} />
                                                    </div>
                                                </div>
                                            </Modal>
                                        </div>
                                        <div className="unit_confirm">
                                            { confirm
                                                ? <Button styleClass="confirm_true" label="확인 완료"/>
                                                : <Button styleClass="confirm_false" label="미확인"/>
                                            }
                                        </div>
                                    </>

                                :
                                    <>
                                        <div className='today_not_clean'>오늘은 청소당번이 아닙니다.</div>
                                    </>
                                }

                            </div>
                        </div>
                    </div>
                    <div className="unit_record_container">
                        <div className="unit_record_title_container">
                            <div className="unit_record_title">청소 내역</div>
                            <img className="move_icon" src={arrow_right} alt="청소내역으로 이동" onClick={()=>{navigate("/cleaning");}}/>
                        </div>
                        <div className='history_container'>
                            <ListView
                                tableFor='cleaning'
                                items = {dummyData}
                            />
                        </div>
                    </div>
                    <div className="btn_container">
                        <Button
                            styleClass="blue_circ_btn"
                            label="대타구하기"
                            onClick={() => navigate("/findfillin")}
                        />
                    </div>
                </div>
            </div>
            <BottomBar/>
        </>
    );
}

export default Unit;