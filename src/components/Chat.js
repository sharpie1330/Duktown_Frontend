import React, {useContext, useEffect, useState} from "react";
import {Client} from "@stomp/stompjs";
import {useParams} from "react-router-dom";
import Button from "./Button";
import AccessTokenContext from "../AccessTokenContext";

function Chat(){
    const params = useParams();
    const chatRoomId = params.chatRoomId;
    const [chat, setChat] = useState('');
    const [chatList, setChatList] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [userNum, setUserNum] = useState(null);
    const { accessToken } = useContext(AccessTokenContext);

    const connect = () => {
        try {
            const stomp = new Client({
                brokerURL: 'ws://localhost:8080/websocket',
                connectHeaders: { Authorization : `Bearer ${accessToken}` },
                debug: (str) => {
                    console.log(str);
                },
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            })

            //1. 채팅 내 내 번호 받아오기
            const subUserNum = stomp.subscribe('/chatRoomUser/userNum', (msg) => {
                const userNumber = JSON.parse(msg.body);
                setUserNum(userNumber);
            })

            //2. 채팅 받아오기(새로운 메세지만 보내주거나 메세지에 번호를 붙이거나 요청하기)
            const subChat = stomp.subscribe(`/sub/chatRoom/${chatRoomId}`, (msg) => {
                const response = JSON.parse(msg.body);
                const newMsg = response.messages;
                setChatList((chats) => [...chats, newMsg]);
            });

            stomp.activate();
            setStompClient(stomp);

            return ()  => {
                if(stompClient){
                    subUserNum.unsubscribe();
                    subChat.unsubscribe();
                    stompClient.deactivate();
                }
            }
        } catch (err) {
            console.log('Websocket Connection error: ', err);
        }
    };

    const sendChat = () => {
        if (chat === '')
            return;
        stompClient.publish({
            destination: `/pub/chatRoom/${chatRoomId}`,
            body: JSON.stringify({
                userNumber: userNum,
                content: chat
            })
        });

        setChat("");
    };

    useEffect(() => {
        const clean = connect();
        return clean && clean();
    }, [accessToken, stompClient]);

    const onChatChange = (e) => {
        setChat(e.target.value);
    };

    const keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            sendChat();
        }
    };

    const msgBox = chatList.map((item, idx) => {
        if (item.userNumber !== userNum && item.userNumber === 0) {
            return (
                <div className='othersChat_container' key={idx}>
                    <span className='sender'>방장</span>
                    <span className='chat_content'>{item.content}</span>
                </div>
            );
        } else if (item.userNumber === userNum) {
            return (
                <div className='myChat_container' key={idx}>
                    <span className='chat_content'>{item.content}</span>
                </div>
            )
        } else {
            return (
                <div className='othersChat_container' key={idx}>
                    <span className='sender'>{`익명${item.userNumber}`}</span>
                    <span className='chat_content'>{item.content}</span>
                </div>
            );
        }
    });

    return (
        <>
            <div className='chatRoom_title_container'>

            </div>
            <div className='chatRoom_chatList_container'>{msgBox}</div>
            <div className='chatRoom_input_container'>
                <Button styleClass='circle_plus_btn' onClick={/*position 위로*/} />
                <input type='text' className='chatRomm_input_field' placeholder='메세지를 입력하세요.' value={chat} onChange={onChatChange} onKeyDown={keyDownHandler}/>
                <div className='chatRoom_sendBtn_container'>
                    <img className='chatRoom_sendBtn_icon' src={} alt='전송' onClick={sendChat}/>
                </div>
            </div>
        </>
    )
}

export default Chat;