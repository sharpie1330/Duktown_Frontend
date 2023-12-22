import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AccessTokenContext from '../AccessTokenContext';
import arrow_left from '../assets/arrow_left.png';
import function_button from '../assets/function_button.png';
import '../css/PostView.css';
import like_icon from '../assets/like.png';
import comment_icon from '../assets/comment.png';
import profile_image from '../assets/profile_image.png';
import post_button from '../assets/post_button.png';
import Comment from '../components/Comment';

function PostView() {
    const location = useLocation();
    const postData = location.state; // URL의 state 속성을 가져옴
    const category = {0: '일상', 1: '장터'}
    const [comments, setComments] = useState([]);

    const { accessToken } = useContext(AccessTokenContext);

    const serverUrl = "http://localhost:8080";
    const apiUrl = serverUrl + "/comments";
    const [replyToCommentId, setReplyToCommentId] = useState(null);

    const fetchComments = async () => {
        
        fetch(apiUrl+`?postId=${postData.id}`, {
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
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
    };

    const postComment = async (event) => {
        event.preventDefault();
        const content = event.target['comment-input'].value;
        console.log(replyToCommentId);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ 
                    "postId": postData.id,
                    "content": content,
                    "parentCommentId": replyToCommentId // 대댓글이면 어떤 댓글에 대한 대댓글인지 식별
                })
            });

            if (response.ok) {
                // 서버 응답이 성공인 경우
                fetchComments();
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
    
    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <>
            <div className='title_container'>
                <img className='announcement_icon' src={arrow_left} onClick={()=>{window.history.back();}}></img>
                {category[postData.category]}
            </div>
            <div className='content_container'>
                <div id='upperInfo'>
                    <img id='profileImage' src={profile_image} />
                    <table id='nameAndTime'>
                        <tr id='userName'>익명</tr>
                        <tr id='post-time'>{postData.datetime}</tr>    
                    </table>
                    <button className='functionBtn' type='submit' form='post-form'>
                        <img src={function_button}/>
                    </button>
                </div>
                
                <p className="post-title">{postData.title}</p>
                <p className="post-content">{postData.content}</p>
                <div className="post-details">
                    <img src={like_icon}/><span className="post-likes">{postData.likeCount}</span>
                    <img src={comment_icon}/><span className="post-comments">{postData.commentCount}</span>
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
                                    content={comment.content}
                                    liked={comment.liked}
                                    likeCount={comment.likeCount}
                                    dateTime={comment.dateTime}
                                    deleted={comment.deleted}
                                    childComments={comment.childComments}
                                    setReplyToCommentId={setReplyToCommentId}
                                />
                            );
                        })}
                    </div>
                    ) : (
                    <></>
                )}
                </div>
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

export default PostView;
