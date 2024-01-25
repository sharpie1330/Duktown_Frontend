import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import loggedIn from '../utils';
import arrow_left from '../assets/arrow_left.png';
import function_button from '../assets/function_button.png';
import like_icon from '../assets/like.png';
import like_blue_icon from '../assets/like_blue.png';
import comment_icon from '../assets/comment.png';
import comment_blue_icon from '../assets/comment_blue.png';
import profile_image from '../assets/profile_image.png';
import post_button from '../assets/post_button.png';
import Comment from '../components/Comment';
import '../css/PostView.css';

function PostView() {
    const location = useLocation();
    const navigate = useNavigate();
    const param = useParams();
    const id = param.postId;
    const category_name = {0: '일상', 1: '장터'}
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({
        id: null,
        userId: null,
        category: null,
        title: '',
        content: '',
        liked: null,
        likeCount: null,
        commentCount: null,
        datetime: '',
        isWriter: null,
    });

    const accessToken  = localStorage.getItem('accessToken');
    const serverUrl = process.env.REACT_APP_BASEURL;
    const [replyToCommentId, setReplyToCommentId] = useState(null);
    const [showFunctionButton, setShowFunctionButton] = useState(false); // 신고하기 또는 삭제하기 버튼 보임 여부
    const functionButtonRef = useRef(null);

    // 글 내용 가져오기
    const fetchPost = async () => {

        fetch(serverUrl + '/posts' + `/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Authorization': `Bearer ${accessToken}`,
            },
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            setPost({
                id: data.id,
                userId: data.userId,
                category: data.category,
                title: data.title,
                content: data.content,
                liked: data.liked,
                likeCount: data.likeCount,
                commentCount: data.commentCount,
                datetime: data.datetime,
                isWriter: data.isWriter,
            });
        })
        .catch(error => console.error('Error:', error));
    }

    // 댓글 목록 가져오기
    const fetchComments = async () => {
        try {
            const response = await fetch(serverUrl + "/comments" + `?postId=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Authorization': `Bearer ${accessToken}`,
                },
                method: 'GET',
            });
    
            if (response.ok) {
                const data = await response.json();
                setComments(data.content);
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // 댓글 등록
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
                    "postId": id,
                    "content": content,
                    "parentCommentId": replyToCommentId // 대댓글이면 어떤 댓글에 대한 대댓글인지 식별
                })
            });

            if (response.ok) {
                // 서버 응답이 성공인 경우
                event.target['comment-input'].value = '';
                setReplyToCommentId(null);
                fetchPost();
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

    // 좋아요 기능
    const handleLike = async () => {
        try {
            const response = await fetch(serverUrl + "/likes", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ 
                    "postId": id,
                    "commentId": null,
                })
            });

            if (response.ok) {
                fetchPost();
            } 
            else{
                return response.json().then(errorResponse => {
                    throw new EvalError(errorResponse.errorMessage);
                });
            }
        } catch (error) {
            alert(error);
        }
    };

    const handleFunctionButtonClick = () => {
        setShowFunctionButton(!showFunctionButton);
    };

    // 글 삭제하기
    const handleDeletePost = async () => {
        try {
            const response = await fetch(serverUrl + `/posts/${post.id}`, {
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

    // 글 신고하기
    const handleReportPost = () => {

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
    
    // 첫 렌더링 시 글과 댓글 내용 가져오기
    useEffect(() => {

        // 토큰이 없을 경우 로그인 페이지로 이동
        if(!loggedIn()){
            alert('로그인이 필요합니다');
            navigate('/signin');
        }

        const fetchData = async () => {
            await fetchPost();
            await fetchComments();
        };

        fetchData();
    }, [id, accessToken]);

    const shareHandler = async () => {
        await navigator.clipboard.writeText(`http://localhost:3000${location.pathname}`)
            .then(_ => {alert("클립보드에 링크가 복사되었습니다")})
            .catch(error => console.log(error));
    }

    return (
        <>
            <div className='title_container'>
                <div>
                    <img className='announcement_icon' src={arrow_left} onClick={()=>{window.history.back();}} alt='뒤로가기'></img>
                    {category_name[post.category]}
                </div>
            </div>
            <div className='content_container'>
                <div id='upperInfo'>
                    <img id='profileImage' src={profile_image} alt='프로필'/>
                    <table id='nameAndTime'>
                        <tbody>
                            <tr id='userName'>{'익명'}</tr>
                            <tr id='post-time'>{post.datetime}</tr>
                        </tbody>
                    </table>
                    <button className='functionBtn' type='submit' form='post-form'>
                        <img src={function_button} onClick={handleFunctionButtonClick} ref={functionButtonRef} alt='더보기'/>
                    </button>
                    {showFunctionButton && (
                        <div className='post-small-modal'>
                            {post.isWriter ?
                                <>
                                    <div id='post_share_btn' onClick={shareHandler}>공유하기</div>
                                    <div onClick={handleDeletePost}>삭제하기</div>
                                </>
                                :
                                <>
                                    <div onClick={shareHandler}>공유하기</div>
                                </>
                                // <span onClick={handleReportPost}>신고하기</span>
                            }
                        </div>  
                    )}
                </div>
                <p className="post-title">{post.title}</p>
                <p className="post-full-content">{post.content}</p>
                <div className="post-details">
                    {post.liked ?
                    <img src={like_blue_icon} onClick={handleLike} alt='좋아요'/>
                    :
                    <img src={like_icon} onClick={handleLike} alt='좋아요'/>}
                    <span className="post-likes">{post.likeCount}</span>
                    <img src={comment_blue_icon} className='comment_btn' alt='댓글'/><span className="post-comments">{post.commentCount}</span>
                </div>
                <hr/>
                <div className='comments'>
                {comments && comments.length > 0 ? (
                    <div id="commentList">
                        {comments.map((comment) => {
                            return (
                                <div key={comment.commentId}>
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
                                        isChildComment={false}
                                    />
                                </div>
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

export default PostView;
