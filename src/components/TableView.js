import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import '../css/TableView.css';
import likes from '../assets/like.png';
import comment from '../assets/comment.png';
function TableView({ items, tableFor, keyword, edit, handler }) {
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (chatRoomId) => {
        // 아이템이 이미 선택된 경우 해제, 아닌 경우 추가
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(chatRoomId)) {
                return prevSelectedItems.filter((id) => id !== chatRoomId);
            } else {
                return [...prevSelectedItems, chatRoomId];
            }
        });
    };

    useEffect(() => {
        if (handler){
            try {
                handler(selectedItems);
            } catch (error) {
                console.error("Error in handler function:", error);
            }
        }
    }, [selectedItems, handler]);

    let table = [];
    switch (tableFor) {
        case 'repair':
            const repairTableArr = items.map(item => {
                let rows = [];
                rows.push(
                    <>
                        <div className='tableRow'>
                            <div className='dateCol'>{item.date}</div>
                            <div className='contentCol'>{item.content}</div>
                            <div className='confirmCol'>{item.confirm}</div>
                        </div>
                        <div className='statusCol'>{item.status}</div>
                    </>
                );
                return rows;
            })
            table = repairTableArr;
            break;
        case 'stayout':
            const stayOutTableArr = items.map(item => {
                const createdAt = new Date(item.createdAt);
                const dayArr = ['일', '월', '화', '수', '목', '금', '토'];
                const requestDay = `${createdAt.getFullYear()}.${createdAt.getMonth()+1}.${createdAt.getDate()}. (${dayArr[createdAt.getDay()]})`;
                let rows = [];
                rows.push(
                    <div className='content'>
                        <div className='tableRow'>
                            <span className='requestDateCol'>{requestDay}</span>
                            <span className='rangeCol'>총 <span className='range_highlight'>{item.period}</span> 일 외박</span>
                        </div>
                        <div className='startDateRow'>{`외박 시작 날짜 ${item.startDate}`}</div>
                        <div className='endDateRow'>{`돌아오는 날짜 ${item.endDate}`}</div>
                        <div className='addressRow'>{`${item.address}`}</div>
                    </div>
                );
                return rows;
            })
            table = stayOutTableArr;
            break;
        case 'repairHistory':
            const repairHistoryTableArr = items.map(item => {
                let rows = [];
                rows.push(
                    <div className='content'>
                        <div className='tableRow'>
                            <div className='contentCol'><Link to={`/repairs/historys/detail/${item.id}`}>{item.content}</Link></div>
                            <div className='confirmCol'><div className={item.checked ? 'confirm' : 'unconfirmed'}>{item.checked ? '확인' : '미확인'}</div></div>
                            <div className='statusCol'><div className={item.solved ? 'solve' : 'unresolved'}>{item.solved ? '해결' : '미해결'}</div></div>
                        </div>
                        <div className='dateRow' >{item.date}</div>
                    </div>
                );
                return rows;
            })
            table = repairHistoryTableArr;
            break;
        case 'noticeList':
            const noticeListTableArr = items.map(item => {
                const today = new Date();
                const itemDate = new Date(item.date);
                const isNew = (itemDate.getFullYear()===today.getFullYear())&&(itemDate.getMonth()===today.getMonth())&&(itemDate.getDate()===today.getDate());
                let rows = [];
                rows.push(
                    <>
                        <div className='tableRow1'>
                            <div className='titleCol'>
                                <div className='titleCol_abbr_container'><abbr className={isNew ? 'new' : 'old'}>N</abbr></div>
                                <Link className={isNew ? 'newA' : 'oldA'} to={`/notice/list/detail/${item.id}`}>{item.title}</Link>
                            </div>
                        </div>
                        <div className='tableRow2'><span> {item.date}</span></div>
                    </>
                );
                return rows;
            })
            table = noticeListTableArr;
            break;
        case 'search':
            const searchTableArr = items.map(item => {
                //텍스트 하이라이팅
                const textSplit = item.title ? item.title.split(new RegExp(`(${keyword})`, 'gi')) : [];
                console.log(keyword.toUpperCase());

                let rows = [];
                const kewordHighlight = textSplit.map(text =>
                    text.toUpperCase() === keyword.toUpperCase()
                    ? (<span className='keyword'>{text}</span>)
                    : (<span>{text}</span>)
                );
                rows.push(
                    <div>
                        <div className='titleRow'>{kewordHighlight}</div>
                        <div className='dateRow'>{item.date}</div>
                    </div>
                );
                return rows;
            })
            table = searchTableArr;
            break;
        case 'chatRoom':
            const chatRoomTableArr = items.map(item => {
                const today = new Date();
                const recentMsgDate = new Date(item.recentChatCreatedAt);
                let recentDate = ``;
                if (today.getFullYear()===recentMsgDate.getFullYear()
                    && today.getMonth()===recentMsgDate.getMonth()
                    && today.getDate()===recentMsgDate.getDate()) {
                    recentDate = `${recentMsgDate.getHours()}시 ${recentMsgDate.getMinutes()}분`
                } else {
                    recentDate = `${recentMsgDate.getFullYear()-2000}. ${recentMsgDate.getMonth()+1}. ${recentMsgDate.getDate()}`
                }

                let rows = [];
                rows.push(
                    <div className='chatRoom_list_container'>
                        {edit ? <input className='chatRoom_round_checkbox' type='checkbox' value={item.chatRoomId} onChange={() => handleCheckboxChange(item.chatRoomId)} checked={selectedItems.includes(item.chatRoomId)}/> : <></>}
                        <div className='chatRoom_container' key={item.chatRoomId} onClick={() => navigate(`/chatRoom/${item.chatRoomId}`)}>
                            <div className='chatRoom_horizontal_container1'>
                                <div className='chatRoom_title'>{item.title}</div>
                                <div className='chatRoom_recentChatMessage'>{item.recentChatMessage}</div>
                            </div>
                            <div className='chatRoom_horizontal_container2'>
                                <div className='chatRoom_recentChatCreatedAt'>{recentDate}</div>
                            </div>
                        </div>
                    </div>
                );
                return rows;
            })
            table = chatRoomTableArr;
            break;
        case 'myDeliveryPost':
            const myDeliveryPostArr = items.map(item => {
                const content = item.content;
                let visContent = '';
                if (content.length >= 75){
                    const subContent = content.substr(0, 75);
                    visContent = subContent + '...';
                } else {
                    visContent = content;
                }

                let rows = [];
                rows.push(
                    <Link className='myPost_container' to={`/delivery/${item.deliveryId}`}>
                        <div className='title'>{item.title}</div>
                        <div className='content'>{visContent}</div>
                        <div className='myPost_horizontal_container'>
                            <img className='myPost_comments' src={comment} alt='comment'/>
                            <span className='commentCount'>{item.commentCount}</span>
                            <span className='createdAt'>{`| ${item.createdAt}`}</span>
                        </div>
                    </Link>
                );
                return rows;
            })
            table = myDeliveryPostArr;
            break;
        case 'myPost':
            const myPostArr = items.map(item => {
                const content = item.content;
                let visContent = '';
                if (content.length >= 75){
                    const subContent = content.substr(0, 75);
                    visContent = subContent + '...';
                } else {
                    visContent = content;
                }

                let rows = [];
                rows.push(
                    <Link className='myPost_container' to={`/delivery/${item.deliveryId}`}>
                        <div className='title'>{item.title}</div>
                        <div className='content'>{visContent}</div>
                        <div className='myPost_horizontal_container'>
                            <img className='myPost_likes' src={likes} alt='comment'/>
                            <span className='likeCount'>{item.likeCount}</span>
                            <img className='myPost_comments' src={comment} alt='comment'/>
                            <span className='commentCount'>{item.commentCount}</span>
                            <span className='datetime'>{`| ${item.datetime}`}</span>
                        </div>
                    </Link>
                );
                return rows;
            })
            table = myPostArr;
            break;
        default:
            table = [];
            break;
    }

    return (
        <div className={tableFor}>
            {table}
        </div>
    );
}

export default TableView