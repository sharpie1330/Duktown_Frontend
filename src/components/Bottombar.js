import React from 'react';
import edit from '../assets/edit.png';
import home from '../assets/home.png';
import community from '../assets/community.png';
import edit_blue from '../assets/edit_blue.png';
import home_blue from '../assets/home_blue.png';
import community_blue from '../assets/community_blue.png';
import '../css/Bottombar.css';

function Bottombar(){
    return (
        <footer>
            <div className='bottombar'>
                <img src={edit} alt="edit" className="bottombar_icon"/>
                <img src={home_blue} alt="home" className="bottombar_icon"/>
                <img src={community} alt="community" className="bottombar_icon"/>
            </div>
        </footer>
    );
}

export default Bottombar;
