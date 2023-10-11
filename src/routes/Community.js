import React, { useState } from 'react';
import DeliveryPost from '../components/DeliveryPost';
import GeneralPost from '../components/GeneralPost';
import '../css/Community.css';

function Community() {
    // 게시글 목록과 선택된 카테고리를 관리할 상태 변수
    const [posts, setPosts] = useState([
        { id: 1, title: '게시글 1', category: '배달팟', order: '20시 30분', recruitment: '2/4', time: '10분 전' },
        { id: 2, title: '게시글 2', category: '일상', like: 15, comment: 8, time: '8:30' },
        { id: 3, title: '게시글 3', category: '장터', like: 20, comment: 12, time: '6:10' },
        { id: 4, title: '게시글 4', category: '배달팟', order: '18시 30분', recruitment: '1/4', time: '15분 전' },
        { id: 5, title: '게시글 5', category: '일상', like: 12, comment: 6, time: '9:00' },
        { id: 6, title: '게시글 6', category: '장터', like: 25, comment: 10, time: '10:20' },
    ]);

    const [selectedCategory, setSelectedCategory] = useState('배달팟'); // 초기 카테고리 설정

    // 카테고리를 선택할 때 호출되는 함수
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    // 현재 선택된 카테고리에 맞게 게시글을 필터링하는 함수
    const filteredPosts = posts.filter((post) => post.category === selectedCategory);

    return (
        <>
        <div className='category'>
            <button 
                onClick={() => handleCategorySelect('배달팟')} 
                style={{ borderColor: selectedCategory === '배달팟' ? '#6A9CFD' : '#E6E6E6' }}>
                    배달팟
            </button>
            <button 
                onClick={() => handleCategorySelect('일상')}
                style={{ borderColor: selectedCategory === '일상' ? '#6A9CFD' : '#E6E6E6' }}>
                일상
            </button>
            <button 
                onClick={() => handleCategorySelect('장터')}
                style={{ borderColor: selectedCategory === '장터' ? '#6A9CFD' : '#E6E6E6' }}>
                장터
            </button>
        </div>
        <hr/>
        <div className="post_list">
        {filteredPosts.map((post) => {
            // 카테고리에 따라 다른 컴포넌트 렌더링
            return post.category === '배달팟' ? (
                <DeliveryPost
                key={post.id}
                title={post.title}
                content={post.category}
                order={post.order}
                recruitment={post.recruitment}
                time={post.time}
                />
            ) : (
                <GeneralPost
                key={post.id}
                title={post.title}
                content={post.category}
                like={post.like}
                comment={post.comment}
                time={post.time}
                />
            );
            })}
        </div>
        </>
    );
}

export default Community;
