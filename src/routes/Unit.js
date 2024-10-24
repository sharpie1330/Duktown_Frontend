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
import loggedIn from "../utils";

function Unit() {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [history, setHistory] = useState([]);
    const [isCleaningDay, setIsCleaningDay] = useState(false);
    const [cleaningId, setCleaningId] = useState(null);
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState(null);
    const [done, setDone] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const serverUrl = process.env.REACT_APP_BASEURL;

    // 상단바, 하단바 제외 내용 높이 설정
    useEffect(() => {
        const setContentHeight = () => {
            const upperBar = document.querySelector('.upper_bar');
            const bottomBar = document.querySelector('.bottom_tabs');
            const contentContainer = document.querySelector('.center_content_container');
    
            // 요소가 찾아졌는지 확인
            if (upperBar && bottomBar && contentContainer) {
                const upperBarHeight = upperBar.offsetHeight;
                const bottomBarHeight = bottomBar.offsetHeight;
    
                // 상단바와 하단바 사이의 높이로 contentContainer의 높이 설정
                const contentHeight = window.innerHeight - upperBarHeight - bottomBarHeight;
    
                contentContainer.style.height = `${contentHeight - 40}px`;
            }
        };
    
        // 페이지가 로드된 후에 한 번 실행
        setContentHeight();
    
        // 리사이즈 이벤트에 대한 리스너 추가
        window.addEventListener('resize', setContentHeight);
    
        // 컴포넌트가 언마운트될 때 리사이즈 이벤트 리스너를 제거
        return () => {
            window.removeEventListener('resize', setContentHeight);
        };
    }, []); // 빈 배열을 전달하여 한 번만 실행되도록 함

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
                if (response.ok)
                    return response;
                else {
                    return response.json().then(errorData => {
                        if (errorData.errorMessage && (errorData.errorMessage.includes('Token') || errorData.errorMessage === undefined)) {
                            window.open(`${serverUrl}/signin`, '_self');
                        } else {
                            throw new EvalError(errorData.errorMessage);
                        }
                    });
                }
            })
            .then(() => {
                setModalIsOpen(false);
                setDone(true);
                alert("청소완료 처리되었습니다.");
            })
            .catch((errorResponse) => {
                setModalIsOpen(false);
                alert(errorResponse);
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
    const dummyData = [
        {cleaningDate: '2024-01-25', cleaned: false, checked: false},
        {cleaningDate: '2024-01-18', cleaned: true, checked: true},
        {cleaningDate: '2024-01-11', cleaned: true, checked: true},
        {cleaningDate: '2024-01-04', cleaned: true, checked: true},
    ]
    useEffect(() => {
        if(!loggedIn()){
            alert('로그인이 필요합니다');
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
                    return response.json().then(errorData => {
                        if (errorData.errorMessage && (errorData.errorMessage.includes('Token') || errorData.errorMessage === undefined)) {
                            window.open(`${serverUrl}/signin`, '_self');
                        } else {
                            throw new EvalError(errorData.errorMessage);
                        }
                    });
                }
            })
            .then((data) => {
                setSchedule(data.data);
            })
            .catch((errorResponse) => {
                alert(errorResponse);
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
                    return response.json().then(errorData => {
                        if (errorData.errorMessage && (errorData.errorMessage.includes('Token') || errorData.errorMessage === undefined)) {
                            window.open(`${serverUrl}/signin`, '_self');
                        } else {
                            throw new EvalError(errorData.errorMessage);
                        }
                    });
                }
            })
            .then((data) => {
                if (data.content && data.content.length > 0) {
                    setHistory(data.content);

                    const todayCleaning = data.content.find((day) => isToday(day.cleaningDate));
                    // 오늘 청소 날짜가 있다면 해당 id를 설정
                    if (todayCleaning) {
                        setDone(todayCleaning.cleaned);
                        setConfirm(todayCleaning.checked);
                    }
                }
            })
            .catch((errorResponse) => {
                alert(errorResponse);
            });


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
                            window.open(`${serverUrl}/signin`, '_self');
                        } else {
                            throw new EvalError(errorData.errorMessage);
                        }
                    });
                }
            })
            .then((data) => {
                setUsername(data.name);
                setRoom(data.roomNumber);
            })
            .catch((errorResponse) => {
                alert(errorResponse);
            });
    }, []);

    let isExist = []
    week.map(([_, day]) => {
        isExist.push(schedule.some(data => (new Date(data.cleaningDate)).getDate() === parseInt(day)));
    })

    useEffect(() => {
        if (schedule.length > 0 && schedule.some((day) => isToday(day.cleaningDate))) {
            const todayCleaning = schedule.find((day) => isToday(day.cleaningDate));
            // 오늘 청소 날짜가 있다면 해당 id를 설정
            if (todayCleaning) {
                setCleaningId(todayCleaning.cleaningId);
            }

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
                            <div className="user_info">{`${room}호 ${username}`}</div>
                            <div className="user_cleaning_time">23:30 ~ 24:00</div>
                            <div className="done_and_confirm">
                                {isCleaningDay
                                ?
                                    <>
                                        <div className="unit_done">
                                            { done
                                                ? <Button styleClass="confirm_false" label="완료"/>
                                                : <Button styleClass="done_true" label="청소 완료" onClick={()=> setModalIsOpen(true)}/>
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
                        <div className='cleaning_history_container'>
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