import React, { useRef, useEffect, useState } from 'react';
import like_icon from '../assets/like.png';
import like_blue_icon from '../assets/like_blue.png';
import comment_icon from '../assets/comment.png';
import comment_blue_icon from '../assets/comment_blue.png';
import function_button from '../assets/function_button.png';
import profile_image from '../assets/profile_image.png';
import reply_icon from '../assets/reply_icon.png';
import '../css/Comment.css';

function Comment({ commentId, userId, userTitle, content, liked, likeCount, isWriter, dateTime, deleted, childComments, deliveryId, isDeliveryWriter, setReplyToCommentId, fetchComments, fetchPost, postComment, isChildComment}) {
    const serverUrl = process.env.REACT_APP_BASEURL;
    const apiUrl = serverUrl + "/comments";
    const accessToken = localStorage.getItem('accessToken');
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
    const handleReportComment = async () => {

    };

    // 배달팟 초대
    const handleInvitation = async () => {
        try {
            const response = await fetch(serverUrl + '/chatRoom/invite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    'inviteUserId': userId,
                    'deliveryId': deliveryId,
                    'userNumber': Number(userTitle.slice(-1))
                })
            });

            if (response.ok) {
                fetchPost();
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

    // useEffect(() => {
    //     setSendChildComment(true);
    //     setReplyIcon(comment_icon);
    // }, [postComment]);

    return (
        <>
            <div id='upperInfo'>
                <img className='comment-profileImage' src={profile_image} alt='프로필'/>
                <span className={userTitle === "글쓴이" ? 'comment-user comment-user-blue': 'comment-user'}>
                    {userTitle}
                </span>

                <span className='comment-time'>{dateTime}</span>
                {isWriter || isDeliveryWriter && userTitle !== "(알수없음)"? (
                    <button className='functionBtn'>
                        <img src={function_button} onClick={handleFunctionButtonClick} ref={functionButtonRef} alt='더보기'/>
                    </button>
                ): null}
                {showFunctionButton && (
                  <div className='small-modal'>
                    {isWriter ? (
                        <span onClick={handleDeleteComment}>삭제하기</span>
                    ) : null }
                    {isDeliveryWriter && !isWriter ? (
                        <span onClick={handleInvitation}>배달팟 초대하기</span>
                    ) : null}
                    {/* <span onClick={handleReportComment}>신고하기</span> */}
                  </div>  
                )}
            </div>
            <p className="comment-content">{content}</p>
            <div className="comment-details">
                {liked ?
                <img src={like_blue_icon} onClick={handleLike} alt='좋아요_활성'/>
                :
                <img src={like_icon} onClick={handleLike} alt='좋아요_비활성'/>
                }
                <span className="post-likes">좋아요 {likeCount}</span>
                {isChildComment ? null : (
                    <div className='reply-container' onClick={handleReply}>
                        <img src={replyIcon} alt='답글'/>
                        <span className="reply">답글쓰기</span>
                    </div>
                )}
                
            </div>
            {childComments && childComments.length > 0 ?
                <div className='childComments'>
                    {childComments.map((comment) => {
                        return (
                            <div className='child-comment'>
                                <table className='reply-form'>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img src={reply_icon} style={{width: "15px"}} alt='답글'/>
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
                                                    deliveryId={deliveryId}
                                                    isDeliveryWriter={isDeliveryWriter}
                                                    setReplyToCommentId={setReplyToCommentId}
                                                    fetchComments={fetchComments}
                                                    fetchPost={fetchPost}
                                                    postComment={postComment}
                                                    isChildComment={true}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
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
