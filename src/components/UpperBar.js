import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryContext from '../CategoryContext';
import logo from '../assets/duktown_logo.png';
import mypage from '../assets/mypage.png';
import search from '../assets/search.png';

const Upperbar = ({ searchAvailable }) => {
    const navigate = useNavigate();
    const { storedCategory } = useContext(CategoryContext);

    const handleSearchClick = () => {
        navigate(`/community/search?category=${storedCategory}`);
    };

    return (
        <>
            <div className='upper_bar'>
                <img src={logo} alt="Logo" className="upper_bar_logo"/>
                {searchAvailable ? 
                    <img src={search} alt='search' className='upper_bar_icon' onClick={handleSearchClick}/> 
                    : null
                }
                <img src={mypage} alt="My Page" className="upper_bar_icon" onClick={() => navigate('/myPage')}/>
            </div>
        </>
    )
};

export default Upperbar;
