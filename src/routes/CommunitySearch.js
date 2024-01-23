import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryPost from '../components/DeliveryPost';
import GeneralPost from '../components/GeneralPost';
import arrow_left from '../assets/arrow_left.png';
import search from "../assets/search.png";
import '../css/Community.css';

function CommunitySearch() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const [currentRenderPage, setCurrentRenderPage] = useState('listView');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [keywordList, setKeywordList] = useState(JSON.parse(localStorage.getItem('keywords')) || '[]');
    const [posts, setPosts] = useState([]);
    const serverUrl = "http://localhost:8080";
    const apiUrl = serverUrl + "/posts";
    const categoryNumber = {'daily': 0, 'market': 1};
    const categoryName = {'daily': '일상', 'market': '장터', 'delivery': '배달'};
    const placeholderText = `[${categoryName[category]}] 검색어를 입력해주세요`;

    const inputRef = useRef(null);

    const handleKeyword = () => {
        setSearchKeyword('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const newKeyword = {
                id: new Date(),
                text: searchKeyword
            }
            setKeywordList([newKeyword, ...keywordList]);
            fetchSearchResult();
        }
    }

    const fetchSearchResult = () => {
        if(category === 'delivery'){
            fetch(serverUrl + `/delivery/search?keyword=${searchKeyword}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Authorization': `Bearer ${accessToken}`,
                },
                method: 'GET',
            })
            .then(response => response.json())  // JSON을 파싱하기 위해 response.json()을 사용
            .then(data => {
                setPosts(data.content);
            })
            .catch(error => console.error('Error:', error));
        }
        else {
            fetch(apiUrl+`/search?keyword=${searchKeyword}&category=${categoryNumber[category]}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Authorization': `Bearer ${accessToken}`,
                },
                method: 'GET',
            })
            .then(response => response.json())  // JSON을 파싱하기 위해 response.json()을 사용
            .then(data => {
                setPosts(data.content);
            })
            .catch(error => console.error('Error:', error));
        }
    };
    
    return (
        <>
        <div className='announcement_searchBar_container'>
            <img className='announcement_searchBar_icon' src={arrow_left} alt="뒤로 가기" onClick={() => window.history.back()}/>
            <div>
            <input type='text' className='announcement_searchBar_field' value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} onKeyDown={handleSearch} ref={inputRef}
                placeholder={placeholderText}/>
                <img className='announcement_search_icon' id={searchKeyword==='' ? 'notExist1' : 'exist1'} src={search} alt='검색' onClick={() => setCurrentRenderPage('search')}/>
                    <button type='button' className='delete_btn' id={searchKeyword==='' ? 'notExist2' : 'exist2'} onClick={handleKeyword}>✕</button>
            </div>
        </div>
        <div className='content_container'>
        {posts && posts.length > 0 ? (
                <div className="post_list">
                    {posts.map((post) => {
                    // 카테고리에 따라 다른 컴포넌트 렌더링
                    return category === 'delivery' ? (
                        <DeliveryPost
                            userId={post.userId}
                            deliveryId={post.deliveryId}
                            title={post.title}
                            createdAt={post.createdAt}
                            maxPeople={post.maxPeople}
                            orderTime={post.orderTime}
                            content={post.content}
                            peopleCount={post.peopleCount}
                            commentCount={post.commentCount}
                            active={post.active}
                        />
                    ) : (
                        <GeneralPost
                            id={post.id}
                            userId={post.userId}
                            category={post.category}
                            title={post.title}
                            content={post.content}
                            liked={post.liked}
                            likeCount={post.likeCount}
                            commentCount={post.commentCount}
                            datetime={post.datetime}
                        />
                    );
                    })}
                </div>
                ) : (
                <div>검색어와 일치하는 내용의 게시글이 없습니다</div>
            )}
        </div>
    </>
    );
}

export default CommunitySearch;