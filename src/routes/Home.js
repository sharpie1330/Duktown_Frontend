import React from 'react';
import { useNavigate } from 'react-router-dom';
import repair from '../assets/repair.png';
import register from '../assets/register.png';
import sleepover from '../assets/sleepover.png';
import announcement from '../assets/announcement.png';
import arrow_right from '../assets/arrow_right.png';
import '../css/Home.css';

function Home(){
    
    const navigate = useNavigate();

    return (
        <>
            <div className='announcement_container'>
                <div className='home_announcement_horizontal_container'>
                    <p className='board_title'>공지사항</p>
                    <img className='detail_icon' src={arrow_right} alt='자세히 보기' onClick={() => navigate('/notice/list')}/>
                </div>
                <div className='board'>
                    내용
                </div>
            </div>
            <div className='meal_container'>
                <p className='board_title'>오늘의 메뉴</p>
                <div className='board'>
                    내용
                </div>
            </div>
            <div className='menu_container'>
                <div className='menu' onClick={()=>{navigate('/repairs/historys')}}>
                    <img src={repair} className='menu_icon'/>
                    수리 요청
                </div>
                <div className='menu'>
                    <img src={register} className='menu_icon'/>
                    입사 신청
                </div>
                <div className='menu' onClick={()=>{navigate('/stayout')}}>
                    <img src={sleepover} className='menu_icon'/>
                    외박 신청
                </div>
                <div className='menu' onClick={()=>{navigate('/announcement/historys')}}>
                    <img src={announcement} className='menu_icon'/>
                    점호 방송
                </div>
            </div>
        </> 
    );
}

export default Home;
