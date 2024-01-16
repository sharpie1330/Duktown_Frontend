import React from 'react';
import announcement from '../assets/announcement_icon.png';
import meal from '../assets/meal_icon.png';
import sleepover from '../assets/sleepover_blue.png';
import repair from '../assets/repair_blue.png';
import notification from '../assets/notification_blue.png';
import circle from '../assets/circle_gray.png';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import '../css/NewHome.css';

function NewHome(){
    const navigate = useNavigate();
    return (
        <>
            <div className='flex-menu-container'>
                <div className='gradient-box flex-item' id='portal-link'
                    onClick={() => {window.open('https://www.duksung.ac.kr/main.do?isMaster=N&isLogined=N&viewPrefix=%2FWEB-INF%2Fjsp%2Fcms&urlRootPath=&siteResourcePath=%2Fsite%2Fduksung');}}>
                    <div className='menu-text'>
                        <p className='menu-title'>덕성여자대학교 포털</p>
                        <p className='menu-info'>포털사이트 바로가기</p>
                    </div>
                </div>
                <div className='gradient-box flex-item' id='announcement-link'
                    onClick={() => {navigate('/notice/list')}}>
                    <img className='icon' src={announcement}/>
                    <div className='menu-text'>
                        <p className='menu-title'>공지사항</p>
                        <p className='menu-info'>기숙사 전체 공지 확인하기</p>
                    </div>
                </div>
                <div className='gradient-box flex-item' id='meal-link'>
                    <img className='icon' src={meal}/>
                    <div className='menu-text'>
                        <p className='menu-title'>오늘의 메뉴</p>
                        <p className='menu-info'>오늘 학식 뭐 먹을까?</p>
                    </div>
                </div>
                <div className='white-box flex-item' id='sleepover'
                    onClick={()=>{navigate('/stayout')}}>
                    <img src={sleepover}/>
                    <p className='menu-title'>외박신청</p>
                </div>
                <div className='flex-vertical'>
                    <div className='white-box flex-item' id='repair'
                        onClick={()=>{navigate('/repairs/historys')}}>
                        <img src={repair}/>
                        <p className='menu-title'>수리요청</p>
                    </div>
                    <div className='white-box flex-item' id='notification'
                        onClick={()=>{navigate('/announcement/historys')}}>
                        <img src={notification}/>
                        <p className='menu-title'>점호방송</p>
                    </div>
                </div>
            </div>
            <div className='info-box'>
                <div className='info-menu' onClick={() => {navigate('/appTerms');}}>
                    <img src={circle}/>
                    <p>이용약관</p>
                </div>
                <div className='info-menu'>
                    <a href='https://www.duksung.ac.kr/contents/contents.do?ciIdx=362&menuId=1283'>
                        <img src={circle}/>
                        <p>기숙사 규정</p>
                    </a>

                </div>
                <div className='info-menu' onClick={() => {navigate('/penalty');}}>
                    <img src={circle}/>
                    <p>벌점 기준표</p>
                </div>
            </div>
        </> 
    );
}

export default NewHome;
