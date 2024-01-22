import React, { useState, useEffect, useContext } from 'react';
import AccessTokenContext from '../AccessTokenContext';
import DeliveryPost from '../components/DeliveryPost';
import GeneralPost from '../components/GeneralPost';
import '../css/Community.css';
import plus from '../assets/plus_icon.png';
import {useNavigate} from 'react-router-dom';

function Community({ topic, setActiveTopic}) {
    const navigate = useNavigate();
    const { accessToken } = useContext(AccessTokenContext);

    // 게시글 목록과 선택된 카테고리를 관리할 상태 변수
    const [posts, setPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(topic); // 초기 카테고리 설정
    const [pageNumber, setPageNumber] = useState(1); // 페이지 번호, 디폴트 1
    const [loading, setLoading] = useState(false);
    const [deliverySort, setDeliverySort] = useState(0);

    const serverUrl = "http://localhost:8080";
    const apiUrl = serverUrl + "/posts";
    const categoryNumber = {'daily': 0, 'market': 1};

    // 카테고리 변경 시, 해당 카테고리의 글들을 가져오는 함수
    const fetchPostsByCategory = async () => {
        if(selectedCategory === 'delivery'){
            console.log(`/delivery?sortBy=${deliverySort}`);
            fetch(serverUrl + `/delivery?sortBy=${deliverySort}`, {
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
            fetch(apiUrl+`?category=${categoryNumber[selectedCategory]}&pageNo=${pageNumber}`, {
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

    const fetchMorePosts = async () => {
        if (loading) return;

        setLoading(true);

        // Fetch more posts based on the current page number or any other logic
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

            // Append the new posts to the existing ones
            setPosts([...posts, ...data.content]);

            // Update the page number
            setPageNumber(newPageNumber);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Event listener for scroll
    const handleScroll = () => {
        // Check if the user has scrolled to the bottom of the page
        if (
            window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
        ) {
            fetchMorePosts();
        }
    };

    // Attach scroll event listener when the component mounts
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, pageNumber, posts, selectedCategory]);

    // 선택된 카테고리 변경 시, 글들을 다시 불러옴
    useEffect(() => {
        // 이전 페이지의 상태를 로컬 스토리지에서 불러오기
        const previousPageInfo = JSON.parse(localStorage.getItem('previousPageInfo'));

        // 이전 페이지의 정보가 있다면 해당 정보를 사용하여 렌더링
        if (previousPageInfo) {
            if (previousPageInfo.category) {
                // 페이지가 Community인 경우의 처리 로직
                setSelectedCategory(previousPageInfo.category);
            }
        }

        const fetchData = async () => {
            if (selectedCategory) {
                setActiveTopic(selectedCategory);
            fetchPostsByCategory();
            }
        };
        fetchData();
    }, [selectedCategory, deliverySort]);

    // 카테고리를 선택할 때 호출되는 함수
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        navigate(`/community?category=${category}`);
    };

    return (
        <>
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
            {posts && posts.length > 0 ? (
                <div className="post-list">
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
                </div>
                ) : (
                <div>게시글이 없습니다</div>
            )}
            <button className='newPostBtn' onClick={()=>{navigate(`/newpost?selectedCategory=${selectedCategory}`)}}>
                    <img src={plus}/>
                    글쓰기
            </button>
        </>
    );
}

export default Community;