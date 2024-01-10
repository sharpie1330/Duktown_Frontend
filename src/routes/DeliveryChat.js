import React, {useContext, useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Chat from "../components/Chat";
import arrow_left from "../assets/arrow_left.png";
import function_button from "../assets/function_button.png";
import AccessTokenContext from "../AccessTokenContext";
import '../css/DeliveryChat.css';
import FuncPannel from "../components/FuncPannel";

function DeliveryChat() {
    const navigate = useNavigate();
    const params = useParams();
    const chatRoomId = params.chatRoomId;
    const { accessToken } = useContext(AccessTokenContext);

    //채팅방 정보
    const [deliveryId, setDeliveryId] = useState(null);
    const [deliveryDeleted, setDeliveryDeleted] = useState(false);
    const [title, setTitle] = useState('');
    const [maxPeople, setMaxPeople] = useState(null);
    const [orderTime, setOrderTime] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [userNum, setUserNum] = useState(0);
    const [isOpenFunc, setIsOpenFunc] = useState(false);

    //채팅방 정보 가져오기
    const serverUrl = 'http://localhost:8080';
    const apiUrl = serverUrl + `/chatRoom/${chatRoomId}`
    const getChatInfo = async (url, atk) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${atk}`,
                },
            });

            if (response.ok) {
                return response.json();
            } else {
                return await response.json().then(errorResponse => {
                    console.log(errorResponse);
                    throw new EvalError(errorResponse.errorMessage);
                });
            }
        } catch (error) {
            alert(error);
        }
    }
    useEffect(() => {
        getChatInfo(apiUrl, accessToken).then(data => {
            console.log(data);
            setDeliveryId(data.deliveryId);
            setDeliveryDeleted(data.deliveryDeleted);
            setTitle(data.title);
            setMaxPeople(data.maxPeople);
            setOrderTime(data.orderTime);
            setAccountNumber(data.accountNumber);
        });
    }, []);

    return (
        <>
            <div className='chat_title_container'>
                <div className='chatRoom_upper_bar'>
                    <img className='chatRoom_upper_icon' src={arrow_left} alt='뒤로가기' onClick={() => navigate('/main')}/>
                    <span className='chat_title'>{title}</span>
                    <img className='chatRoom_upper_icon' src={function_button} alt='더보기' onClick={() => {!isOpenFunc ? setIsOpenFunc(true) : setIsOpenFunc(false)}}/>
                    {isOpenFunc ? <FuncPannel userNumber={userNum} type='title'/> : <></>}
                </div>
                <div className='chatRoom_orderInfo'>
                    현재 배달팟 인원
                    <div className='chatRoom_people'>{`1/${maxPeople}`}</div> {/*TODO: 현재 인원 필요*/}
                    주문 예정 시각
                    <div className='chatRoom_orderTime'>{orderTime}</div>
                </div>
                <div className='chatRoom_accountInfo'>{accountNumber}</div>
            </div>
            <Chat roomId={chatRoomId}/>
        </>
    )
}

export default DeliveryChat;