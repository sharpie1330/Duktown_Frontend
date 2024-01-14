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
    const apiUrl1 = serverUrl + "/posts";
    const apiUrl2 = serverUrl + "/delivery";

    const uploadPost = async (additionalData) => {
        const category = {'daily': 0, 'market': 1}
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        if(selectedCategory === "delivery"){
            try {
                const response = await fetch(apiUrl2, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        "title": title,
                        "content": content,
                        ...additionalData,
                    })
                });

                if (response.ok) {
                    console.log("배달팟 등록 성공");
                    navigate('/community?category=delivery');
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
        }
        else {
            try {
                const response = await fetch(apiUrl1, {
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
                    navigate(`/community?category=${selectedCategory}`);
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
                <form id='post-form' onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const additionalData = {
                        maxPeople: formData.get('maxPeople'),
                        orderTime: formData.get('orderTime'),
                        accountNumber: formData.get('accountNumber'),
                    };

                    uploadPost(additionalData);
                }}>
                    <input 
                        id='post-title' 
                        type='text' 
                        placeholder='제목을 입력해주세요'
                    >
                    </input>
                    {selectedCategory === "배달팟" ?
                    <>
                        <div className='deliveryInfo'>
                            <span>최대 모집 인원</span>
                            <input type="number" id='maxPeople'></input>
                        </div>
                        <div className='deliveryInfo'>
                            <span>주문 예정 시각</span>
                            <input type="datetime-local" id='orderTime'></input>
                        </div>
                        <div className='deliveryInfo'>
                            <span>송금 받을 계좌</span>
                            <input type="text" id='accountNumber'></input>
                        </div>
                    </>
                        
                    :
                        <></>
                    }
                    <br/>
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
