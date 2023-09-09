import React from 'react';
import edit from '../assets/edit.png';
import home from '../assets/home.png';
import community from '../assets/community.png';
import '../css/Bottombar.css';

function Bottombar(){
    return (
        <div className='bottombar'>
            <img src={edit} alt="edit" className="bottombar_icon"/>
            <img src={home} alt="home" className="bottombar_icon"/>
            <img src={community} alt="community" className="bottombar_icon"/>
        </div>
    );
}

export default Bottombar;
