import React from 'react';
import like_icon from '../assets/like.png';
import comment_icon from '../assets/comment.png';
import function_button from '../assets/function_button.png';
import profile_image from '../assets/profile_image.png';
import reply_icon from '../assets/reply_icon.png';
import '../css/Comment.css';

import { useNavigate } from 'react-router-dom';

function Comment({ commentId, userId, content, liked, likeCount, dateTime, deleted, childComments, setReplyToCommentId }) {

    const serverUrl = "http://localhost:8080";
    const apiUrl = serverUrl + "/comments";

    const handleReply = () => {
        console.log("답글쓰기");
        setReplyToCommentId(commentId);
    };

    return (
        <>
            <div id='upperInfo'>
                <img id='comment-profileImage' src={profile_image} />
                <span id='comment-user'>익명</span>
                <span id='comment-time'>{dateTime}</span>    
                <button className='functionBtn'>
                    <img src={function_button}/>
                </button>
            </div>
            <p id="comment-content">{content}</p>
            <div id="comment-details">
                <img src={like_icon}/><span className="post-likes">좋아요 {likeCount}</span>
                <img src={comment_icon}/><span className="reply" onClick={handleReply}>답글쓰기</span>
            </div>
            {childComments && childComments.length > 0 ?
                <div id='childComments'>
                    {childComments.map((comment) => {
                            return (
                                <div className='child-comment'>
                                    <table className='reply-form'>
                                        <td>
                                            <img src={reply_icon} />
                                        </td>
                                        <td>
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
                                        </td>
                                    </table>
                                    
                                    
                                </div>
                            );
                        })}
                </div>
            :
            <></>}
        </>
    );
}

export default Comment;
