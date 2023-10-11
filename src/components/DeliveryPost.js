import React from 'react';

function DeliveryPost({ title, content, order, recruitment, time }) {
    return (
        <div className="post">
        <p className="post-title">{title}</p>
        <p className="post-content">{content}</p>
        <p className="post-order">주문 예정 시각 {order}</p>
        <div className='recruitment-details'>
            <span className="post-recruitment">{recruitment}</span>
            <span className="post-time">{time}</span>
        </div>
        <hr/>
        </div>
    );
}

export default DeliveryPost;
