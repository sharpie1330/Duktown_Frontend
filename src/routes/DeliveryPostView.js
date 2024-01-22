import React, { useEffect, useContext, useState } from 'react';
import {useParams} from 'react-router-dom';
import AccessTokenContext from '../AccessTokenContext';
import arrow_left from '../assets/arrow_left.png';
import function_button from '../assets/function_button.png';
import '../css/PostView.css';
import comment_icon from '../assets/comment_blue.png';
import profile_image from '../assets/profile_image.png';
import post_button from '../assets/post_button.png';
import Comment from '../components/Comment';

function DeliveryPostView() {
    const location = useParams();
    const deliveryId = Number(location.deliveryId); // URL의 parameter를 가져옴("/:deliveryId" 부분)
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({
        userId: '',
        title: '',
        createdAt: '',
        maxPeople: 0,
        commentCount: 0,
        active: true,
        isWriter: true
    });

    const { accessToken } = useContext(AccessTokenContext);

    const serverUrl = "http://localhost:8080";
    const [replyToCommentId, setReplyToCommentId] = useState(null);

    const fetchPost = async () => {
        fetch(serverUrl + '/delivery' + `/${deliveryId}`, {
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
            if (data.code === 40001){
                alert(data.errorMessage);
                window.history.back();
            }
            setPost({
                userId: data.userId,
                title: data.title,
                createdAt: data.createdAt,
                maxPeople: data.maxPeople,
                orderTime: data.orderTime,
                content: data.content,
                peopleCount: data.peopleCount,
                commentCount: data.commentCount,
                active: data.active,
                isWriter: data.isWriter
            });
        })
        .catch(error => console.error('Error:', error));
    }

    const fetchComments = async () => {
        
        fetch(serverUrl + "/comments" +`?deliveryId=${deliveryId}`, {
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
            setComments(data.content);
        })
        .catch(error => console.error('Error:', error));
    };

    const postComment = async (event) => {
        event.preventDefault();
        const content = event.target['comment-input'].value;

        try {
            const response = await fetch(serverUrl + "/comments", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ 
                    "deliveryId": deliveryId,
                    "content": content,
                    "parentCommentId": replyToCommentId // 대댓글이면 어떤 댓글에 대한 대댓글인지 식별
                })
            });

            if (response.ok) {
                // 서버 응답이 성공인 경우
                event.target['comment-input'].value = '';
                fetchComments();
            } 
            else{
                return await response.json().then(errorResponse => {
                    throw new EvalError(errorResponse.errorMessage);
                });
            }
        } catch (error) {
            alert(error);
        }
    };
    
    useEffect(() => {
        fetchPost();
        fetchComments();
    }, []);

    return (
        <>
            <div className='title_container'>
                <img className='announcement_icon' src={arrow_left} onClick={()=>{window.history.back();}}></img>
                배달팟
            </div>
            <div className='content_container'>
                <div id='upperInfo'>
                    <img id='profileImage' src={profile_image} />
                    <table id='nameAndTime'>
                        <tr id='userName'>익명</tr>
                        <tr id='post-time'>{post.datetime}</tr>    
                    </table>
                    <button className='functionBtn' type='submit' form='post-form'>
                        <img src={function_button}/>
                    </button>
                </div>
                
                <p className="post-title">{post.title}</p>
                <table className='recruitment-info'>
                    <tr>
                        <td><span className='delivery-gray-text'>최대 모집 인원</span></td>
                        <td><span className='delivery-blue-text'>{post.maxPeople}명</span></td>
                    </tr>
                    <tr>
                        <td><span className='delivery-gray-text'>주문 예정 시각</span></td>
                        <td><span className='delivery-blue-text'>{post.orderTime}</span></td>
                    </tr>
                </table>
                <p id="postview-content">{post.content}</p>
                <div className="post-details">
                    <span className="post-recruitment">{post.peopleCount}/{post.maxPeople}</span>
                    <img src={comment_icon} style={{width: '15px'}}/><span className="post-comments">{post.commentCount}</span>
                </div>
                <hr/>
                <div className='comments'>
                {comments && comments.length > 0 ? (
                    <div id="commentList">
                        {comments.map((comment) => {
                            return (
                                <Comment
                                    commentId={comment.commentId}
                                    userId={comment.userId}
                                    userTitle={comment.userTitle}
                                    content={comment.content}
                                    liked={comment.liked}
                                    likeCount={comment.likeCount}
                                    isWriter={comment.isWriter}
                                    dateTime={comment.dateTime}
                                    deleted={comment.deleted}
                                    childComments={comment.childComments}
                                    deliveryId={post.isWriter ? deliveryId : null}
                                    isDeliveryWriter={post.isWriter ? true : false}
                                    setReplyToCommentId={setReplyToCommentId}
                                    fetchComments={fetchComments}
                                    fetchPost={fetchPost}
                                />
                            );
                        })}
                    </div>
                    ) : (
                    <></>
                )}
                </div>
            </div>
            <div className='bottom_bar'>
                <div id='postComment'>
                    <form id='commentForm' onSubmit={postComment}>
                        <input id='comment-input' placeholder='댓글을 입력하세요'></input>
                        <button id='postBtn' type='submit'>
                            <img src={post_button}/>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default DeliveryPostView;
