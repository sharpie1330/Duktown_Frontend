import React, { useContext, useEffect, useState } from 'react';
import like_icon from '../assets/like.png';
import like_blue_icon from '../assets/like_blue.png';
import comment_icon from '../assets/comment.png';
import comment_blue_icon from '../assets/comment_blue.png';
import function_button from '../assets/function_button.png';
import profile_image from '../assets/profile_image.png';
import reply_icon from '../assets/reply_icon.png';
import '../css/Comment.css';
import AccessTokenContext from '../AccessTokenContext';

function Comment({ commentId, userId, userTitle, content, liked, likeCount, dateTime, deleted, childComments, setReplyToCommentId, fetchComments, postComment }) {
    const serverUrl = "http://localhost:8080";
    const apiUrl = serverUrl + "/comments";
    const { accessToken } = useContext(AccessTokenContext);
    const [sendChildComment, setSendChildComment] = useState(true);
    const [replyIcon, setReplyIcon] = useState(comment_icon);

    const handleReply = () => {
        setSendChildComment(!sendChildComment);
        if(sendChildComment){
            setReplyToCommentId(commentId);
            setReplyIcon(comment_blue_icon);
        }
        else {
            setReplyToCommentId(null);
            setReplyIcon(comment_icon);
        }
    };

    const handleLike = async () => {
        try {
            const response = await fetch(serverUrl + "/likes", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ 
                    "postId": null,
                    "commentId": commentId,
                })
            });

            if (response.ok) {
                fetchComments();
            } 
            else {
                return response.json().then(errorResponse => {
                    throw new EvalError(errorResponse.errorMessage);
                });
            }
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        setSendChildComment(true);
        setReplyIcon(comment_icon);
    }, [postComment]);

    return (
        <>
            <div id='upperInfo'>
                <img id='comment-profileImage' src={profile_image} />
                <span id='comment-user'>
                    {userTitle}
                </span>

                <span id='comment-time'>{dateTime}</span>    
                <button className='functionBtn'>
                    <img src={function_button}/>
                </button>
            </div>
            <p id="comment-content">{content}</p>
            <div id="comment-details">
                {liked ?
                <img src={like_blue_icon} onClick={handleLike}/>
                :
                <img src={like_icon} onClick={handleLike}/>
                }
                <span className="post-likes">좋아요 {likeCount}</span>
                <img src={replyIcon}/>
                <span className="reply" onClick={handleReply}>답글쓰기</span>
            </div>
            {childComments && childComments.length > 0 ?
                <div id='childComments'>
                    {childComments.map((comment) => {
                        return (
                            <div className='child-comment'>
                                <table className='reply-form'>
                                    <tr>
                                        <td>
                                            <img src={reply_icon} style={{width: "15px"}}/>
                                        </td>
                                        <td>
                                            <Comment
                                                commentId={comment.commentId}
                                                userId={comment.userId}
                                                userTitle={comment.userTitle}
                                                content={comment.content}
                                                liked={comment.liked}
                                                likeCount={comment.likeCount}
                                                dateTime={comment.dateTime}
                                                deleted={comment.deleted}
                                                childComments={comment.childComments}
                                                setReplyToCommentId={setReplyToCommentId}
                                                fetchComments={fetchComments}
                                                postComment={postComment}
                                            />
                                        </td>
                                    </tr>
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
