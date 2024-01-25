import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import loggedIn from '../utils';
import arrow_left from '../assets/arrow_left.png';
import function_button from '../assets/function_button.png';
import comment_icon from '../assets/comment_blue.png';
import profile_image from '../assets/profile_image.png';
import post_button from '../assets/post_button.png';
import Comment from '../components/Comment';
import '../css/PostView.css';

function DeliveryPostView() {
    const location = useLocation();
    const navigate = useNavigate();
    const param = useParams();
    const deliveryId = Number(param.deliveryId); // URL의 parameter를 가져옴("/:deliveryId" 부분)
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

    const accessToken = localStorage.getItem('accessToken');

    const serverUrl = process.env.REACT_APP_BASEURL;
    const [replyToCommentId, setReplyToCommentId] = useState(null);
    const [showFunctionButton, setShowFunctionButton] = useState(false); // 신고하기 또는 삭제하기 버튼 보임 여부
    const functionButtonRef = useRef(null);

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
        // 토큰이 없을 경우 로그인 페이지로 이동
        if(!loggedIn()){
            alert('로그인이 필요합니다');
            navigate('/signin');
        }

        document.addEventListener('click', handleDocumentClick);
        fetchPost();
        fetchComments();

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const shareHandler = async () => {
        await navigator.clipboard.writeText(`http://localhost:3000${location.pathname}`)
            .then(_ => {alert("클립보드에 링크가 복사되었습니다")})
            .catch(error => console.log(error));
    }

    const handleDocumentClick = (event) => {
        if (functionButtonRef.current && !functionButtonRef.current.contains(event.target)) {
            setShowFunctionButton(false);
        }
    };

    const handleFunctionButtonClick = () => {
        setShowFunctionButton(!showFunctionButton);
    };

    const handleDeleteDelivery = async () => {
        try {
            const response = await fetch(serverUrl + `/delivery/${deliveryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                window.history.back();
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


    return (
        <>
            <div className='title_container'>
                <img className='announcement_icon' src={arrow_left} onClick={()=>{window.history.back();}} alt='뒤로 가기'></img>
                배달팟
            </div>
            <div className='content_container'>
                <div id='upperInfo'>
                    <img id='profileImage' src={profile_image} alt='프로필'/>
                    <table id='nameAndTime'>
                        <tbody>
                            <tr id='userName'>익명</tr>
                            <tr id='post-time'>{post.datetime}</tr>
                        </tbody>
                    </table>
                    <button className='functionBtn' type='submit' form='post-form'>
                        <img src={function_button} onClick={handleFunctionButtonClick} ref={functionButtonRef} alt='더보기'/>
                    </button>
                    {showFunctionButton && (
                        <div className='post-small-modal'>
                            {post.isWriter ? (
                                <>
                                    <div id='post_share_btn' onClick={shareHandler}>공유하기</div>
                                    <div onClick={handleDeleteDelivery}>삭제하기</div>
                                </>
                            ) : (
                                <div onClick={shareHandler}>공유하기</div>
                                // <span onClick={handleReportPost}>신고하기</span>
                            )}
                        </div>
                    )}
                </div>
                
                <p className="post-title">{post.title}</p>
                <table className='recruitment-info'>
                    <tbody>
                        <tr>
                            <td><span className='delivery-gray-text'>최대 모집 인원</span></td>
                            <td><span className='delivery-blue-text'>{post.maxPeople}명</span></td>
                        </tr>
                        <tr>
                            <td><span className='delivery-gray-text'>주문 예정 시각</span></td>
                            <td><span className='delivery-blue-text'>{post.orderTime}</span></td>
                        </tr>
                    </tbody>
                </table>
                <p id="postview-content">{post.content}</p>
                <div className="post-details">
                    <span className="post-recruitment">{post.peopleCount}/{post.maxPeople}</span>
                    <img src={comment_icon} style={{width: '15px'}} alt='댓글'/><span className="post-comments">{post.commentCount}</span>
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
                            <img src={post_button} alt='전송'/>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default DeliveryPostView;
