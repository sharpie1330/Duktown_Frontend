import React, { useState, useEffect } from 'react';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import logo from '../assets/duktown_logo.png';
import notification from '../assets/notification.png';
import mypage from '../assets/mypage.png';
import community from '../assets/edit.png';
import home from '../assets/home.png';
import unit from '../assets/unit.png';
import community_blue from '../assets/edit_blue.png';
import home_blue from '../assets/home_blue.png';
import unit_blue from '../assets/unit_blue.png';
import chat from '../assets/chat.png';
import chat_blue from '../assets/chat_blue.png';
import search from '../assets/search.png';
import '../css/hideScrollbar.css';
import '../css/Upperbar.css';
import '../css/Bottombar.css';
import Home from './Home';
import NewHome from './NewHome';
import Unit from './Unit';
import Community from './Community';
import ChatRoomList from "./ChatRoomList";

function MainTemplate(){
    const params = useParams();
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(params.page);
    const [searchParam, setSearchParam] = useSearchParams();
    const [activeTopic, setActiveTopic] = useState('daily');

    useEffect(() => {

        // 이전 페이지의 상태를 로컬 스토리지에서 불러오기
        const previousPageInfo = JSON.parse(localStorage.getItem('previousPageInfo'));

        // 이전 페이지의 정보가 있다면 해당 정보를 사용하여 렌더링
        if (previousPageInfo) {
            if (previousPageInfo.page === 'community') {
                // 페이지가 Community인 경우의 처리 로직
                setActivePage('community');
            }

            // 로컬 스토리지에서 정보를 사용한 후에는 해당 데이터를 삭제하는 것이 좋습니다.
            localStorage.removeItem('previousPageInfo');
        }
    }, []);

    useEffect(() => {
        if (activePage === 'community'){
            navigate(`/${activePage}?category=daily`);
        } else {
            setActiveTopic('daily');
            navigate(`/${activePage}`);
        }

    }, [activePage, navigate]);

    useEffect(() => {
        if (searchParam) {
            setActiveTopic(searchParam.get('category'));
        }
    }, [searchParam]);

    useEffect(() => {
        console.log(activeTopic)
    }, [activeTopic]);

    return (
        <>
            <div className='upper_bar'>
                <img src={logo} alt="Logo" className="upper_bar_logo"/>
                {params.page === 'community' ? <img src={search} alt='search' className='upper_bar_icon'/> : null }
                <img src={notification} alt="Notification" className="upper_bar_icon"/>
                <img src={mypage} alt="My Page" className="upper_bar_icon" onClick={() => {navigate('/myPage')}}/>
            </div>
            <div className='center_content_container' style={{overflow:"scroll"}}>
                <div className="page" style={{ display: params.page === 'community' ? 'block' : 'none' }}>
                    <Community topic={activeTopic}/>
                </div>
                <div className="page" style={{ display: activePage === 'home' ? 'block' : 'none' }}>
                    <NewHome />
                </div>
                <div className="page" style={{ display: params.page === 'unit' ? 'block' : 'none' }}>
                    <Unit />
                </div>
                <div className="page" style={{ display: params.page === 'chat' ? 'block' : 'none', overflow:"scroll" }}>
                    <ChatRoomList />
                </div>
            </div>
            <div className='bottom_bar'>
                <img src={activePage === 'home' ? home_blue : home}
                     alt="home"
                     className="bottom_bar_icon"
                     onClick={() => setActivePage('home')}
                />
                <img
                    src={activePage === 'community' ? community_blue : community}
                    alt="community"
                    className="bottom_bar_icon"
                    onClick={() => setActivePage('community')}
                />
                <img src={activePage === 'chat' ? chat_blue : chat}
                     alt='chat'
                     className='bottom_bar_icon'
                     onClick={() => setActivePage('chat')}
                />
                <img src={activePage === 'unit' ? unit_blue : unit}
                     alt="unit"
                     className="bottom_bar_icon"
                     onClick={() => setActivePage('unit')}
                />
            </div>
        </>
    );
}

export default MainTemplate;