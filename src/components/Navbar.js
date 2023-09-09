import React from 'react';
import logo from '../assets/duktown_logo.png';
import notification from '../assets/notification.png';
import mypage from '../assets/mypage.png';
import '../css/Navbar.css';

function Navbar(){
    return (
        <div className='navbar'>
            <img src={logo} alt="Logo" className="navbar_logo"/>
            <img src={notification} alt="Notification" className="navbar_icon"/>
            <img src={mypage} alt="My Page" className="navbar_icon"/>
        </div>
    );
}

export default Navbar;
