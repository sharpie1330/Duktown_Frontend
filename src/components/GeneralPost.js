import React from 'react';
import like_icon from '../assets/like.png';
import comment_icon from '../assets/comment.png';
import { useNavigate } from 'react-router-dom';

function GeneralPost({ category, commentCount, content, datetime, id, likeCount, liked, title, userId }) {
    
    const navigate = useNavigate();

    const handlePostClick = () => {
        navigate(`/post/${id}`, {
            state: { category, commentCount, content, datetime, id, likeCount, liked, title, userId }
        });
    };

    return (
        <div className="post" onClick={handlePostClick}>
        <p className="post-title">{title}</p>
        <p className="post-content">{content}</p>
        <div className="post-details">
            <img src={like_icon} style={{width: "15px"}}/><span className="post-likes">{likeCount}</span>
            <img src={comment_icon} style={{width: "15px"}}/><span className="post-comments">{commentCount}</span>
            <span className="post-time">| {datetime}</span>
        </div>
        <hr/>
        </div>
    );
}

export default GeneralPost;
