import React from 'react';
import arrow_left from '../assets/arrow_left.png';
import { useNavigate } from 'react-router-dom';
import '../css/NewPost.css';

function NewPost(){
    const navigate = useNavigate();
    return (
        <>
            <div className='title_container'>
                <img className='announcement_icon' src={arrow_left} onClick={()=>{navigate('/main');}}></img>
                글쓰기
                <button className='postBtn'>작성</button>
            </div>
            <div className='content_container'>
                <p>게시글의 주제를 선택해주세요</p>
                <input className='post-title' type='text' placeholder='제목을 입력해주세요'></input>
                <textarea className='post-content' placeholder='내용을 입력하세요'></textarea>
            </div>
        </>
    );
}

export default NewPost;
