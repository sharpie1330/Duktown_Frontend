import React from 'react';
import arrow_left from '../assets/arrow_left.png';
import arrow_right from '../assets/arrow_right.png';
import '../css/Announcement.css';
import { useNavigate } from 'react-router-dom';

function Announcement(){
    const navigate = useNavigate();
    return (
        <>
            <div className='title_container'>
                <img className='announcement_icon' src={arrow_left} onClick={()=>{navigate('/main');}}></img>
                점호 방송
            </div>
            <div className='content_container'>
                <div className='date_container'>
                    <img className='announcement_icon' src={arrow_left}></img>
                    <span className='date'>2023년 8월 25일</span>
                    <img className='announcement_icon' src={arrow_right}></img>
                </div>
                <form action='#'>
                    <select name='dorm' className='dorm_select'>
                        <option value='가온1관'>가온1관</option>
                        <option value='가온2관'>가온2관</option>
                        <option value='국제관'>국제관</option>
                    </select>
                </form>
                <p className='announcement_content'>
                    점호 방송 내용
                </p>
            </div>
        </>
    );
}

export default Announcement;
