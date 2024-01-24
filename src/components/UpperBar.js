import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/duktown_logo.png';
import mypage from '../assets/mypage.png';
import search from '../assets/search.png';
import '../css/Upperbar.css'

const Upperbar = ({ searchAvailable }) => {
    const navigate = useNavigate();
    const recentCategory = 'daily' || localStorage.getItem('recentCategory');

    const handleSearchClick = () => {
        navigate(`/community/search?category=${recentCategory}`);
    };

    return (
        <>
            <div className='upper_bar'>
                <img src={logo} alt="Logo" className="upper_bar_logo" onClick={() => navigate('/home')}/>
                {searchAvailable ? 
                    <img src={search} alt='search' className='upper_bar_icon' id="community_search_icon" onClick={handleSearchClick}/> 
                    : null
                }
                <img src={mypage} alt="My Page" className="upper_bar_icon" onClick={() => navigate('/myPage')}/>
            </div>
        </>
    )
};

export default Upperbar;
