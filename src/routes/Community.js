import React, { useState, useEffect, useRef } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import loggedIn from '../utils';
import Upperbar from '../components/UpperBar';
import BottomBar from '../components/BottomBar';
import DeliveryPost from '../components/DeliveryPost';
import GeneralPost from '../components/GeneralPost';
import plus from '../assets/plus_icon.png';
import '../css/Community.css';


function Community() {
    const navigate = useNavigate();
    const location = useLocation();
    const category = new URLSearchParams(location.search).get('category');
    const accessToken = localStorage.getItem('accessToken');
    const recentCategory = localStorage.getItem('recentCategory');

    // 게시글 목록과 선택된 카테고리를 관리할 상태 변수
    const [posts, setPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(category ? category : recentCategory); // 초기 카테고리 설정
    const [pageNumber, setPageNumber] = useState(1); // 페이지 번호, 디폴트 1
    const [loadingPost, setLoadingPost] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [deliverySort, setDeliverySort] = useState(0);
    
    const serverUrl = process.env.REACT_APP_BASEURL;
    const apiUrl = serverUrl + "/posts";
    const categoryNumber = {'daily': 0, 'market': 1};
    const scrollRef = useRef(null);

    // 카테고리 변경 시, 해당 카테고리의 글들을 가져오는 함수
    const fetchPostsByCategory = async () => {
        setLoadingPost(true);
    
        try {
            if (selectedCategory === 'delivery') {
                const response = await fetch(serverUrl + `/delivery?sortBy=${deliverySort}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': serverUrl,
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    method: 'GET',
                });
    
                const data = await response.json();
    
                // 불러온 게시글 추가
                setPosts(data.content);
            } else {
                const response = await fetch(apiUrl + `?category=${categoryNumber[selectedCategory]}&pageNo=${pageNumber}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': serverUrl,
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    method: 'GET',
                });
    
                const data = await response.json();
    
                // 불러온 게시글 추가
                setPosts(data.content);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            // finally 블록 내에서 setLoadingPost(false) 호출
            setLoadingPost(false);
        }
    };

    // 게시글 더 불러오기
    const fetchMorePosts = async () => {
        if (loadingMore) return;
        setLoadingMore(true);

        // 로딩할 다음 페이지
        const newPageNumber = pageNumber + 1;

        try {
            const response = await fetch(apiUrl + `?category=${categoryNumber[selectedCategory]}&pageNo=${newPageNumber}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': serverUrl,
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
            setLoadingMore(false);
        }
    };

    const handleScroll = () => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer && selectedCategory !== 'delivery') {
            const isBottom = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight;
            // 추가: 로딩 중이 아니고, 스크롤이 맨 아래에 도달했을 때만 fetchMorePosts 호출
            if (isBottom && !loadingMore) {
                fetchMorePosts();
            }
        }
    };

    // 카테고리를 선택할 때 호출되는 함수
    const handleCategorySelect = (category) => {
        // 카테고리 변경 시에만 내용 삭제 후 변경
        if(category !== selectedCategory){
            setPosts([]);
        }
        setSelectedCategory(category);
        localStorage.setItem('recentCategory', category);
        navigate(`/community?category=${category}`);
        setPageNumber(1);
    };

    useEffect(() => {
        // 토큰이 없을 경우 로그인 페이지로 이동
        if(!loggedIn()){
            alert('로그인이 필요합니다');
            navigate('/signin');
        }
        fetchPostsByCategory();
    }, [selectedCategory, deliverySort])

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
                        <div className='post_not_exist'>
                            {loadingPost ? '게시글을 불러오는 중입니다' : '게시글이 없습니다'}
                        </div>
                    )}
                    </div>
                
                <button className='newPostBtn' onClick={()=>{navigate(`/newpost?selectedCategory=${selectedCategory}`)}}>
                        <img src={plus} alt='글쓰기버튼'/>
                        글쓰기
                </button>
            </div>
            
            <BottomBar/>
        </>
    );
}

export default Community;