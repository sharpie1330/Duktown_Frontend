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

function Comment({ commentId, userId, content, liked, likeCount, dateTime, deleted, childComments, userList, anonymousNumber, setReplyToCommentId, fetchComments }) {
    const serverUrl = "http://localhost:8080";
    const apiUrl = serverUrl + "/comments";
    const { accessToken } = useContext(AccessTokenContext);
    const [localUserList, setLocalUserList] = useState(userList);
    const [sendChildComment, setSendChildComment] = useState(false);

    const handleReply = () => {
        setSendChildComment(!sendChildComment);
        if(sendChildComment){
            setReplyToCommentId(commentId);
            console.log("change to blue icon");
        }
        else {
            setReplyToCommentId(null);
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

    // userList가 변경될 때만 useEffect가 호출되도록 설정
    // useEffect(() => {
    //     // fetchComments가 호출된 후에 localUserList 업데이트
    //     fetchComments();
    //     setLocalUserList(userList);
    // }, [fetchComments, userList]);

    return (
        <>
            <div id='upperInfo'>
                <img id='comment-profileImage' src={profile_image} />
                <span id='comment-user'>
                    {anonymousNumber === 0 ? '글쓴이' : `익명${anonymousNumber}`}
                    {/* {localUserList[userId] ? `익명${localUserList[userId]}` : '글쓴이'} */}
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
                {sendChildComment ? <img src={comment_blue_icon}/> : <img src={comment_icon}/>}
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
                                                userList={localUserList}  // localUserList로 변경
                                                anonymousNumber={anonymousNumber}
                                                setReplyToCommentId={setReplyToCommentId}
                                                fetchComments={fetchComments}
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
