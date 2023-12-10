import React, { useState } from 'react';
import Button from "../components/Button";
import arrow_right from "../assets/arrow_right.png";
import { useNavigate } from 'react-router-dom';
import ListView from "../components/TableView";
import Modal from 'react-modal'
import "../css/Unit.css";
function Unit() {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    function navFillIn() {
        navigate("/findfillin"); {/*나중에 대타구하기로 연결*/}
    }
    function formatToday(date) {
        const weekday = ['일', '월', '화', '수', '목', '금', '토'];
        return date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate()+'. ('+weekday[date.getDay()]+')';
    }

    function sendData(){
        {/*서버로 청소완료 전달*/}
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
    for (let i = 0; i < 7; i++) {
        let newDate = new Date(today.valueOf() + 86400000 * (i - day));
        week.push([i, newDate.getDate()])
    }

    const format_today = formatToday(now);

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
    {/*예시*/}
    const done = false;
    const confirm = false;
    const dummyData = [
        {date: 18, status: '미완료', confirm: '미확인'},
        {date: 21, status: '미완료', confirm: '미확인'},
    ]

    let isExist = []
    week.map(([_, day]) => {
        isExist.push(dummyData.some(data => data.date === parseInt(day)));
    })

    return (
        <>
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
                        <img className="move_icon" src={arrow_right} alt="어딘가로 이동" onClick={()=>{navigate("/home");}}/> {/*나중에 ?로 연결*/}
                    </div>
                    <div className="today_record_container">
                        <div className="user_info">101호 정현조</div>
                        <div className="user_cleaning_time">23:30 ~ 24:00</div>
                        <div className="done_and_confirm">
                            <div className="unit_done">
                                { done
                                    ? <Button styleClass="done_true" label="완료"/>
                                    : <Button styleClass="done_false" label="완료하기" onClick={()=> setModalIsOpen(true)}/>
                                }
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={()=>setModalIsOpen(false)}
                                    style={customModal}> {/*추후 api로 연결*/}
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
                        </div>
                    </div>
                </div>
                <div className="unit_record_container">
                    <div className="unit_record_title_container">
                        <div className="unit_record_title">청소 내역</div>
                        <img className="move_icon" src={arrow_right} alt="어딘가로 이동" onClick={()=>{navigate("/home");}}/> {/*나중에 청소내역으로 연결*/}
                    </div>
                    <div className='history_container'>
                        <ListView
                            items = {[{ id:1, text: 'ex1'}, { id:2, text:'ex2'}]}
                        />
                    </div>
                </div>
                <div className="btn_container">
                    <Button
                        styleClass="blue_circ_btn"
                        label="대타구하기"
                        onClick={navFillIn}
                    />
                </div>
            </div>
        </>
    );
}

export default Unit;