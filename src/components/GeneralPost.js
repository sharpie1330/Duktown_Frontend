import React from 'react';
import like_icon from '../assets/like_blue.png';
import comment_icon from '../assets/comment_blue.png';
import { useNavigate } from 'react-router-dom';

function GeneralPost({ category, commentCount, content, datetime, id, likeCount, liked, title, userId }) {
    
    const navigate = useNavigate();

    const handlePostClick = () => {
        navigate(`/post/${id}`, {
            state: { category, commentCount, content, datetime, id, likeCount, liked, title, userId }
        });
    };

    const subContent = () => {
        let formatedContent;
        if (content.length >= 75){
            const subContent = content.substr(0, 75);
            formatedContent = subContent + '...';
        } else {
            formatedContent = content;
        }
        return formatedContent
    }

    return (
        <div className="post" onClick={handlePostClick}>
        <p className="post-title">{title}</p>
        <p className="post-content">{subContent()}</p>
        <div className="post-details">
            <img src={like_icon} style={{width: "15px"}} alt='좋아요'/><span className="post-likes">{likeCount}</span>
            <img src={comment_icon} style={{width: "15px"}} alt='댓글'/><span className="post-comments">{commentCount}</span>
            <span className="post-time">| {datetime}</span>
        </div>
        <hr/>
        </div>
    );
}

export default GeneralPost;
