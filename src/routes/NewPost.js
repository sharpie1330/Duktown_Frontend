import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import arrow_left from '../assets/arrow_left.png';
import '../css/NewPost.css';
import AccessTokenContext from '../AccessTokenContext';

function NewPost(){
    const navigate = useNavigate();
    const { accessToken } = useContext(AccessTokenContext);
    const location = useLocation();
    const selectedCategory = new URLSearchParams(location.search).get('selectedCategory');

    const serverUrl = "http://localhost:8080";
    const apiUrl = serverUrl + "/posts";

    const uploadPost = async (event) => {
        event.preventDefault();

        const category = {'일상': 0, '장터': 1}
        const title = event.target['post-title'].value;
        const content = event.target['post-content'].value;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ 
                    "category": category[selectedCategory],
                    "title": title,
                    "content": content,
                })
            });

            if (response.ok) {
                // 서버 응답이 성공인 경우
                // 게시글 작성 후 로컬 스토리지에 데이터 저장
                localStorage.setItem('previousPageInfo', JSON.stringify({
                    page: 'community',
                    category: selectedCategory,
                }));
                navigate('/main');
            } 
            else{
                return await response.json().then(errorResponse => {
                    console.log(errorResponse);
                    throw new EvalError(errorResponse.errorMessage);
                });
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <div className='title_container'>
                <img className='announcement_icon' src={arrow_left} onClick={()=>{window.history.back();}}></img>
                글쓰기
                <button className='postBtn' type='submit' form='post-form'>작성</button>
            </div>
            <div className='content_container'>
                <p id='post-category'>{selectedCategory}</p>
                <form id='post-form' onSubmit={uploadPost}>
                    <input 
                        id='post-title' 
                        type='text' 
                        placeholder='제목을 입력해주세요'
                    >
                    </input>
                    <textarea 
                        id='post-content' 
                        placeholder='내용을 입력하세요'
                    >
                    </textarea>
                </form>
                
            </div>
        </>
    );
}

export default NewPost;
