import React from 'react';
import like_icon from '../assets/like.png';
import comment_icon from '../assets/comment.png';

function GeneralPost({ title, content, like, comment, time }) {
    return (
        <div className="post">
        <p className="post-title">{title}</p>
        <p className="post-content">{content}</p>
        <div className="post-details">
            <img src={like_icon}/><span className="post-likes">{like}</span>
            <img src={comment_icon}/><span className="post-comments">{comment}</span>
            <span className="post-time">| {time}</span>
        </div>
        <hr/>
        </div>
    );
}

export default GeneralPost;
