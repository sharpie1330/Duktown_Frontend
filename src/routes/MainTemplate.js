import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import logo from '../assets/duktown_logo.png';
import notification from '../assets/notification.png';
import mypage from '../assets/mypage.png';
import community from '../assets/edit.png';
import home from '../assets/home.png';
import unit from '../assets/unit.png';
import community_blue from '../assets/edit_blue.png';
import home_blue from '../assets/home_blue.png';
import unit_blue from '../assets/unit_blue.png';
import '../css/Bottombar.css';
import '../css/Upperbar.css';
import Home from './Home';
import Unit from './Unit';
import Community from './Community';

function MainTemplate(){
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('home');
    const handlePageChange = (page) => {
        setActivePage(page);
    }

    return (
        <>
            <div className='upper_bar'>
                <img src={logo} alt="Logo" className="upper_bar_logo"/>
                <img src={notification} alt="Notification" className="upper_bar_icon"/>
                <img src={mypage} alt="My Page" className="upper_bar_icon" onClick={() => {navigate('/myPage')}}/>
            </div>
            <div className='content_container'>
                <div className="page" style={{ display: activePage === 'community' ? 'block' : 'none' }}>
                    <Community />
                </div>
                <div className="page" style={{ display: activePage === 'home' ? 'block' : 'none' }}>
                    <Home />
                </div>
                <div className="page" style={{ display: activePage === 'unit' ? 'block' : 'none' }}>
                    <Unit />
                </div>
            </div>
            <div className='bottom_bar'>
                <img 
                    src={activePage === 'community' ? community_blue : community} 
                    alt="community" 
                    className="bottom_bar_icon" 
                    onClick={() => handlePageChange('community')}
                />
                <img src={activePage === 'home' ? home_blue : home} 
                    alt="home" 
                    className="bottom_bar_icon" 
                    onClick={() => handlePageChange('home')}
                />
                <img src={activePage === 'unit' ? unit_blue : unit} 
                    alt="unit" 
                    className="bottom_bar_icon" 
                    onClick={() => handlePageChange('unit')}
                />
            </div>
        </>
    );
}

export default MainTemplate;