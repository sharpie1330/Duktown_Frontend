import React from 'react';
import Navbar from '../components/Navbar';
import Bottombar from "../components/Bottombar";
import Button from "../components/Button";
import arrow_right from "../assets/arrow_right.png";
import { useNavigate } from 'react-router-dom';
import ListView from "../components/ListView";
import "../css/Unit.css";
function Unit() {
    const navigate = useNavigate();
    function clickComplete() {
        navigate("/home"); {/*나중에 팝업창으로 연결*/}
    }
    function navFillIn() {
        navigate("/findfillin"); {/*나중에 대타구하기로 연결*/}
    }
    function formatToday(date) {
        const weekday = ['일', '월', '화', '수', '목', '금', '토'];
        return date.getFullYear()+'.'+date.getMonth()+'.'+date.getDate()+'. ('+weekday[date.getDay()]+')';
    }

    {/*이번 주 날짜 배열 구하기*/}
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const day = today.getDay();
    let week = []
    for (let i = 0; i < 7; i++) {
        let newDate = new Date(today.valueOf() + 86400000 * (i - day));
        week.push([i, newDate.getDate()])
    }

    const format_today = formatToday(now);

    {/*예시*/}
    const done = true;
    const confirm = false;

    return (
        <>
            <Navbar />
            <div className="unit_body_container">
                <div className="weekly_schedule">
                    <p className="year_and_month">{now.getFullYear() + '년 ' + now.getMonth() + '월'}</p>
                    <div className="unit_weekly_calendar">

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
                                    : <Button styleClass="done_false" label="완료하기"/>
                                }
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
            <Bottombar />
        </>
    );
}

export default Unit;