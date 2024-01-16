import React, { useContext, useRef, useEffect, useState } from 'react';
import like_icon from '../assets/like.png';
import like_blue_icon from '../assets/like_blue.png';
import comment_icon from '../assets/comment.png';
import comment_blue_icon from '../assets/comment_blue.png';
import function_button from '../assets/function_button.png';
import profile_image from '../assets/profile_image.png';
import reply_icon from '../assets/reply_icon.png';
import '../css/Comment.css';
import AccessTokenContext from '../AccessTokenContext';

function Comment({ commentId, userId, userTitle, content, liked, likeCount, isWriter, dateTime, deleted, childComments, setReplyToCommentId, fetchComments, fetchPost, postComment }) {
    const serverUrl = "http://localhost:8080";
    const apiUrl = serverUrl + "/comments";
    const { accessToken } = useContext(AccessTokenContext);
    const [sendChildComment, setSendChildComment] = useState(true); // 대댓글 여부
    const [replyIcon, setReplyIcon] = useState(comment_icon); // 답글쓰기 아이콘 색상 설정
    const [showFunctionButton, setShowFunctionButton] = useState(false); // 신고하기 또는 삭제하기 버튼 보임 여부

    const functionButtonRef = useRef(null);

    // 답글쓰기
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

    // 댓글 좋아요
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

    // 댓글 삭제 또는 신고 버튼 보임 여부 설정
    const handleFunctionButtonClick = () => {
        setShowFunctionButton(!showFunctionButton);
    };

    // 댓글 삭제하기
    const handleDeleteComment = async () => {
        try {
            const response = await fetch(apiUrl + `/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                fetchPost();
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

    // 댓글 신고하기
    const handleReportComment = () => {

    }

    // 댓글 삭제 또는 신고 버튼 외의 부분 클릭 시 버튼 없애기
    const handleDocumentClick = (event) => {
        if (functionButtonRef.current && !functionButtonRef.current.contains(event.target)) {
            setShowFunctionButton(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);


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
                    <img src={function_button} onClick={handleFunctionButtonClick} ref={functionButtonRef}/>
                </button>
                {showFunctionButton && (
                  <div className='small-modal'>
                    {isWriter ? (
                        <span onClick={handleDeleteComment}>삭제하기</span>
                    ) : (
                        <span onClick={handleReportComment}>신고하기</span>
                    )}
                  </div>  
                )}
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
                                                isWriter={comment.isWriter}
                                                dateTime={comment.dateTime}
                                                deleted={comment.deleted}
                                                childComments={comment.childComments}
                                                setReplyToCommentId={setReplyToCommentId}
                                                fetchComments={fetchComments}
                                                fetchPost={fetchPost}
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
