import React from 'react';
import Navbar from '../components/Navbar.js';
import Bottombar from '../components/Bottombar.js';
import repair from '../assets/repair.png';
import register from '../assets/register.png';
import sleepover from '../assets/sleepover.png';
import announcement from '../assets/announcement.png';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

function Home(){
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div className='content_container'>
                <p className='board_title'>공지사항</p>
                <div className='board'>
                    내용
                </div>
                <p className='board_title'>오늘의 메뉴</p>
                <div className='board'>
                    내용
                </div>
                <div className='menu_container'>
                    <div className='menu'>
                        <img src={repair} className='menu_icon'/>
                        수리 요청
                    </div>
                    <div className='menu'>
                        <img src={register} className='menu_icon'/>
                        입사 신청
                    </div>
                    <div className='menu'>
                        <img src={sleepover} className='menu_icon'/>
                        외박 신청
                    </div>
                    <div className='menu' onClick={()=>{navigate('/announcement')}}>
                        <img src={announcement} className='menu_icon'/>
                        점호 방송
                    </div>
                </div>
                
            </div>
            <Bottombar />
        </> 
    );
}

export default Home;
