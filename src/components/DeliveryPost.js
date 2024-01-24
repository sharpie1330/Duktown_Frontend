import React from 'react';
import comment_icon from '../assets/comment_blue.png';
import { useNavigate } from 'react-router-dom';


function DeliveryPost({ userId, deliveryId, title, createdAt, maxPeople, orderTime, content, peopleCount, commentCount, active }) {

    const navigate = useNavigate();

    const handlePostClick = () => {
        navigate(`/delivery/${deliveryId}`, {
            state: { deliveryId }
        });
    };

    const subContent = () => {
        let formatedContent;
        if (content.length >= 24){
            const subContent = content.substr(0, 24);
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
        <table className='recruitment-info'>
            <tbody>
                <tr>
                    <td>주문 예정 시각</td>
                    <td>{orderTime}</td>
                </tr>
                <tr>
                    <td>최대 모집 인원</td>
                    <td>{maxPeople}명</td>
                </tr>
            </tbody>
        </table>
        <div className='recruitment-details'>
            <span className="post-recruitment">{peopleCount}/{maxPeople}</span>
            <img src={comment_icon} style={{width: "15px"}} alt='댓글'/><span className="post-comments">{commentCount}</span>
            <span className="post-time">| {createdAt}</span>
        </div>
        <hr/>
        </div>
    );
}

export default DeliveryPost;
