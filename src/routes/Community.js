import React, { useState, useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import Upperbar from '../components/UpperBar';
import BottomBar from '../components/BottomBar';
import DeliveryPost from '../components/DeliveryPost';
import GeneralPost from '../components/GeneralPost';
import plus from '../assets/plus_icon.png';
import '../css/Community.css';

function Community({ category }) {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const recentCategory = localStorage.getItem('recentCategory');

    // 게시글 목록과 선택된 카테고리를 관리할 상태 변수
    const [posts, setPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(category ? category : recentCategory); // 초기 카테고리 설정
    const [pageNumber, setPageNumber] = useState(1); // 페이지 번호, 디폴트 1
    const [loading, setLoading] = useState(false);
    const [deliverySort, setDeliverySort] = useState(0);

    const serverUrl = "http://localhost:8080";
    const apiUrl = serverUrl + "/posts";
    const categoryNumber = {'daily': 0, 'market': 1};
    const scrollRef = useRef(null);

    useEffect(() => {
        const setPostListHeight = () => {
            const postList =document.querySelector('.post-list');
            const listHeight = window.innerHeight - 200;
            postList.style.height = `${listHeight}px`;
        };

        // 초기에 함수 호출하고, 크기 조절 이벤트를 처리하기 위해 리스너 추가
        setPostListHeight();
        window.addEventListener('resize', setPostListHeight);

        return () => {
            // 컴포넌트가 언마운트될 때 리사이즈 이벤트 리스너를 제거
            window.removeEventListener('resize', setPostListHeight);
        };
    }, []);

    // 카테고리 변경 시, 해당 카테고리의 글들을 가져오는 함수
    const fetchPostsByCategory = async () => {

        if(selectedCategory === 'delivery'){
            fetch(serverUrl + `/delivery?sortBy=${deliverySort}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Authorization': `Bearer ${accessToken}`,
                },
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                setPosts(data.content);
            })
            .catch(error => console.error('Error:', error));
        }
        else {
            fetch(apiUrl+`?category=${categoryNumber[selectedCategory]}&pageNo=${pageNumber}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Authorization': `Bearer ${accessToken}`,
                },
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                setPosts(data.content);
            })
            .catch(error => console.error('Error:', error));
        }
        
    };

    // 게시글 더 불러오기
    const fetchMorePosts = async () => {
        if (loading) return;

        setLoading(true);
        console.log("loading");

        // 로딩할 다음 페이지
        const newPageNumber = pageNumber + 1;

        try {
            const response = await fetch(apiUrl + `?category=${categoryNumber[selectedCategory]}&pageNo=${newPageNumber}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Authorization': `Bearer ${accessToken}`,
                },
                method: 'GET',
            });

            const data = await response.json();

            // 불러온 게시글 추가
            setPosts([...posts, ...data.content]);

            // 페이지 번호 업데이트
            setPageNumber(newPageNumber);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            const isBottom = scrollContainer.scrollTop + scrollContainer.clientHeight === scrollContainer.scrollHeight;
            // 추가: 로딩 중이 아니고, 스크롤이 맨 아래에 도달했을 때만 fetchMorePosts 호출
            if (isBottom && !loading) {
                fetchMorePosts();
            }
        }
    };

    // 카테고리를 선택할 때 호출되는 함수
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        localStorage.setItem('recentCategory', category);
        setPageNumber(1);
        navigate(`/community?category=${category}`);
    };

    useEffect(() => {
        fetchPostsByCategory();
    }, [selectedCategory])

    return (
        <>
            <Upperbar searchAvailable={true}/>
            <div className='center_content_container'>
                <div className='category'>
                    <button
                        onClick={() => handleCategorySelect('delivery')}
                        style={{ borderColor: selectedCategory === 'delivery' ? '#6A9CFD' : '#E6E6E6' }}>
                            배달팟
                    </button>
                    <button
                        onClick={() => handleCategorySelect('daily')}
                        style={{ borderColor: selectedCategory === 'daily' ? '#6A9CFD' : '#E6E6E6' }}>
                        일상
                    </button>
                    <button
                        onClick={() => handleCategorySelect('market')}
                        style={{ borderColor: selectedCategory === 'market' ? '#6A9CFD' : '#E6E6E6' }}>
                        장터
                    </button>
                </div>
                <div className="post-list" ref={scrollRef} onScroll={handleScroll}>
                    
                
                {posts && posts.length > 0 ? (
                    <>
                        {selectedCategory === 'delivery' ? 
                            <select name="delivery_sort" id="delivery_sort" onChange={(e) => setDeliverySort(e.target.value)}>
                                <option name="delivery_sort" value='0'>최신순</option>
                                <option name="delivery_sort" value='1'>주문시간 순</option>
                            </select>
                        : null}
                        {posts.map((post) => {
                        // 카테고리에 따라 다른 컴포넌트 렌더링
                        return selectedCategory === 'delivery' ? (
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
                    </>
                    ) : (
                    <div>게시글이 없습니다</div>
                )}
                </div>
                <button className='newPostBtn' onClick={()=>{navigate(`/newpost?selectedCategory=${selectedCategory}`)}}>
                        <img src={plus}/>
                        글쓰기
                </button>
            </div>
            
            <BottomBar/>
        </>
    );
}

export default Community;