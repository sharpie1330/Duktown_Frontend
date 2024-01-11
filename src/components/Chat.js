import React, {useContext, useEffect, useRef, useState} from "react";
import send from '../assets/send.png';
import account from '../assets/account.png';
import orderFinish from '../assets/orderFinish.png';
import AccessTokenContext from "../AccessTokenContext";
import SockJS from 'sockjs-client';
import {Client, Stomp} from "@stomp/stompjs";
import '../css/Chat.css';
import FuncPannel from "./FuncPannel";

function Chat({roomId}){
    let chatRoomId = roomId;
    const [isOpenFunc, setIsOpenFunc] = useState(false);
    //웹소켓 연결 정보
    const [chat, setChat] = useState('');
    const [chatList, setChatList] = useState([]);
    const [isComposing, setIsComposing] = useState(false);
    const userId = 2;
    const [myUserNum, setMyUserNum] = useState(1000);
    const [othersUserNum, setOthersUserNum] = useState(null);
    const [chatIdx, setChatIdx] = useState('');
    const { accessToken } = useContext(AccessTokenContext);
    const scrollRef = useRef();
    const inputRef = useRef();

    const clientRef = useRef(null);
    const connect = () => {
        clientRef.current = new Client({
            brokerURL: 'ws://localhost:8080/websocket',
            connectHeaders: {Authorization: `Bearer ${accessToken}`},
            onConnect: () => {
                console.log("Chat WebSocket Connected");

                //1. 채팅방 구독
                clientRef.current.subscribe(`/sub/chatRoom/${chatRoomId}`, (msg) => {
                    const response = JSON.parse(msg.body);
                });
            },
            onDisconnect: () => { console.log('Disconnected from WebSocket')},
            reconnectDelay: 5000,
            heartbeatIncoming: 30000,
            heartbeatOutgoing: 30000
        });
        clientRef.current.activate();
    }

    const serverUrl = 'http://localhost:8080';
    const apiUrl = serverUrl + `/chats/${roomId}`;
    const pollingChat = async (url, atk) => {
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
            }
            else{
                return response.json().then(errorResponse => {
                    throw new EvalError(errorResponse.errorMessage);
                });
            }
        } catch (err) {
            console.log('getChatList error: ' + err);
        }
    }

    const sendChat = () => {
        if (chat === '')
            return;
        clientRef.current.publish({
            destination: `/pub/chatRoom/${chatRoomId}`,
            body: JSON.stringify({
                userId: userId,
                chatType: "CHAT",
                message: chat,
            }),
        });

        setChat("");
    };

    useEffect(() => {
        console.log('화면 렌더링');
        //localStorage.removeItem('chats');
        const prevMsg = JSON.parse(localStorage.getItem('chats'));
        console.log(prevMsg);
        if (prevMsg !== null) {
            setChatList(prevMsg);
        }
        console.log(chatList);

        connect();

        return () => {
            console.log("화면 나감");
        }
    }, []);

    useEffect(() => {
        console.log('채팅이 올때마다 렌더링됩니다');
        scrollHandler();
        const pollingInterval = setInterval(() => {
            pollingChat(apiUrl, accessToken).then(data => {
                const newChats = data.messages;
                let uniqueArr = newChats.filter(newItem => !chatList.some(oldItem => newItem.chatId === oldItem.chatId));
                console.log(uniqueArr);
                if (uniqueArr.length > 0) {
                    setChatList(prevChatList => [...prevChatList, ...uniqueArr].sort((a, b) => a.chatId - b.chatId));
                    console.log(chatList);

                    localStorage.setItem('chats', JSON.stringify(chatList));
                }
                console.log(chatList);

            });
        }, 1000);

        return () => {
            console.log('새로운 채팅이 들어와 재렌더링합니다');
            const test = JSON.parse(localStorage.getItem('chats'));
            console.log(test);
            clearInterval(pollingInterval);
        };
    }, [chatList]);

    const scrollHandler = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }

    const inputHandler = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const onChatChange = (e) => {
        setChat(e.target.value);
    };

    const keyDownHandler = (e) => {
        if (isComposing) return;
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChat();
            inputHandler();
        }
    };

    const msgBoxHandler = () => {
        return chatList.map((item, idx) => {
            switch (item.chatType) {
                case 'JOIN':
                    return (
                        <div className='infoMsg_container'>
                            {item.message}
                        </div>
                    );
                case 'EXIT':
                    return (
                        <div className='infoMsg_container'>
                            {item.message}
                        </div>
                    );
                case 'ORDER_FINISH':
                    return (
                        <div className='orderFinishChat_container'>
                            <div className='infoMsg_icon_container'>
                                <img className='infoMsg_icon1' src={orderFinish} alt='주문완료'/>
                            </div>
                            <span>글쓴이가 주문을 완료했어요!</span>
                        </div>
                    );
                case 'ACCOUNT_EDIT':
                    return (
                        <div className='accountEditChat_container'>
                            <div className='infoMsg_icon_container'>
                                <img className='infoMsg_icon2' src={account} alt='계좌변경'/>
                            </div>
                            <span>글쓴이가 송금 계좌를 수정했어요!</span>
                        </div>
                    );
                case 'WRITER_EXIT':
                    return (
                        <div className='infoMsg_container'>
                            {item.message}
                        </div>
                    );
                case 'FORCE_OUT':
                    return (
                        <div className='infoMsg_container'>
                            {item.message}
                        </div>
                    );
                case 'CHAT':
                    if (item.userId !== userId && item.userNumber === 0) {
                        return (
                            <div className='othersChat_container' id={`chat_${idx}`}>
                                <span
                                    className='sender'
                                    onClick={() => {
                                        !isOpenFunc ? setIsOpenFunc(true) : setIsOpenFunc(false);
                                        setOthersUserNum(item.userNumber);
                                        setChatIdx(`chat_${idx}`);}}>
                                    글쓴이
                                </span>
                                {
                                    isOpenFunc && othersUserNum === item.userNumber && `chat_${idx}` === chatIdx
                                    ? <FuncPannel userNumber={othersUserNum} type='title'/>
                                    : <></>
                                }
                                <div className='othersChat_message'>{item.message}</div>
                            </div>
                        );
                    } else if (item.userId === userId) {
                        return (
                            <div className='myChat_container' id={`chat_${idx}`}>
                                <span className='chat_content'>{item.message}</span>
                            </div>
                        )
                    } else {
                        return (
                            <div className='othersChat_container' id={`chat_${idx}`}>
                                <span
                                    className='sender'
                                    onClick={() => {
                                        !isOpenFunc ? setIsOpenFunc(true) : setIsOpenFunc(false);
                                        setOthersUserNum(item.userNumber);
                                        setChatIdx(`chat_${idx}`);}}>
                                    {`익명${item.userNumber}`}
                                </span>
                                {
                                    isOpenFunc && othersUserNum === item.userNumber && `chat_${idx}` === chatIdx
                                        ? <FuncPannel userNumber={othersUserNum} type='title'/>
                                        : <></>
                                }
                                <div className='othersChat_message'>{item.message}</div>
                            </div>
                        );
                    }
            }
        });
    }

    return (
        <>
            <div className='chat_container'>
                <div className='chat_scroll_container' ref={scrollRef}>
                    <div className='chatRoom_chatList_container'>{msgBoxHandler()}</div>
                </div>
                <div className='chatRoom_bottom_container'>
                    <div className='chatRoom_input_container'>
                        <textarea className='chatRoom_input_area' placeholder='메세지를 입력하세요.' ref={inputRef} value={chat} onChange={onChatChange}
                                  onCompositionStart={()=>setIsComposing(true)} onCompositionEnd={()=>setIsComposing(false)} onKeyDown={keyDownHandler}/>
                    </div>
                    <div className='chatRoom_sendBtn_container'>
                        <img className='chatRoom_sendBtn_icon' src={send} alt='전송' onClick={() => {sendChat(); inputHandler();}}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat;