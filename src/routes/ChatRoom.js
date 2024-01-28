import React, {useEffect, useRef, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import arrow_left from "../assets/arrow_left.png";
import function_button from "../assets/function_button.png";
import '../css/ChatRoom.css';
import FuncPannel from "../components/FuncPannel";
import {Client} from "@stomp/stompjs";
import send from "../assets/send.png";
import orderFinish from "../assets/orderFinish.png";
import account from "../assets/account.png";
import loggedIn from "../utils";

function ChatRoom() {
    const navigate = useNavigate();
    const params = useParams();
    const chatRoomId = params.chatRoomId;
    const serverUrl = process.env.REACT_APP_BASEURL;
    const clientRef = useRef(null); //Stomp 연결
    const [isOpenChatRoomFunc, setIsOpenChatRoomFunc] = useState(false); //더보기 창
    const [isOpenChatFunc, setIsOpenChatFunc] = useState(false); //채팅의 더보기 창
    //채팅방 정보
    const [deliveryId, setDeliveryId] = useState(null); //채팅방 아이디
    const [deliveryDeleted, setDeliveryDeleted] = useState(false); //채팅방 삭제 여부
    const [title, setTitle] = useState(''); //채팅방 제목
    const [maxPeople, setMaxPeople] = useState(null); //최대 인원
    const [chatRoomUserCnt, setChatRoomUserCnt] = useState(1);
    const [orderTime, setOrderTime] = useState(''); //주문 예정 시간
    const [accountNumber, setAccountNumber] = useState(''); //계좌 번호
    //채팅
    //const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [chatPage, setChatPage] = useState(0);
    const [hasLeftMessage, setHasLeftMessage] = useState(true);
    const [chatList, setChatList] = useState([]); //localStorage에 저장된 채팅 내역
    const [chat, setChat] = useState(''); //현재 입력 중인 채팅
    const [isReadOnly, setIsReadOnly] = useState(false); //입력창 활성화 여부
    const [isComposing, setIsComposing] = useState(false); //조합 여부
    const inputRef = useRef(); //입력 커서
    const scrollRef = useRef(); //스크롤 바
    //유저 정보
    const [myUserId, setMyUserId] = useState(null);
    const [myUserNum, setMyUserNum] = useState(null); //나의 userNum
    const [othersUserNum, setOthersUserNum] = useState(null); //이름을 누른 사용자의 userNum
    const [chatIdx, setChatIdx] = useState(''); //이름을 누른 채팅의 idx
    const accessToken = localStorage.getItem('accessToken');


    //채팅방 정보 가져오기
    const apiUrl1 = serverUrl + `/chatRoom/${chatRoomId}`
    const getChatInfo = async (atk) => {
        try {
            const response = await fetch(apiUrl1, {
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
                    if (errorResponse.errorMessage.includes('Token') || errorResponse.errorMessage === undefined) {
                        window.open('https://www.duktown.site/signin', '_self');
                    } else {
                        throw new EvalError(errorResponse.errorMessage);
                    }
                });
            }
        } catch (error) {
            if (error.errorMessage.includes('Token') || error.errorMessage === undefined) {
                window.open('https://www.duktown.site/signin', '_self');
            } else {
                throw new EvalError(error.errorMessage);
            }
        }
    }

    const getPrevChatList = async (atk, page, size) => {
        let apiUrl2;
        if (!size) {
            apiUrl2 = serverUrl + `/chats/${chatRoomId}?page=${page}`;
        } else {
            apiUrl2 = serverUrl + `/chats/${chatRoomId}?page=${page}&size=${size}`;
        }

        try {
            const response = await fetch(apiUrl2, {
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
                    if (errorResponse.errorMessage.includes('Token') || errorResponse.errorMessage === undefined) {
                        window.open('https://www.duktown.site/signin', '_self');
                    } else {
                        throw new EvalError(errorResponse.errorMessage);
                    }
                });
            }
        } catch (error) {
            if (error.errorMessage.includes('Token') || error.errorMessage === undefined) {
                window.open('https://www.duktown.site/signin', '_self');
            } else {
                throw new EvalError(error.errorMessage);
            }
        }
    }

    //stomp 연결
    const connect = () => {
        clientRef.current = new Client({
            brokerURL: 'wss://www.duktown.site:8080/websocket',
            connectHeaders: {Authorization: `Bearer ${accessToken}`},
            onConnect: () => {
                // 연결 확인
                if (clientRef.current && clientRef.current.connected) {
                    console.log("Chat WebSocket Connected");
                    // 1. 채팅방 구독
                    clientRef.current.subscribe(`/sub/chatRoom/${chatRoomId}`, (msg) => {
                        let newMessage = JSON.parse(msg.body);
                        setChatList(prevState => [...prevState, newMessage]);
                    });
                }
            },
            onDisconnect: () => { console.log('Disconnected from WebSocket')},
            reconnectDelay: 5000,
            heartbeatIncoming: 30000,
            heartbeatOutgoing: 30000
        });
        clientRef.current.activate();
    }
    //2. 새로 온 채팅 처리
    const lastChatChecker = (chatList) => {
        const lastChat = chatList[chatList.length - 1];
        if (lastChat.chatType === 'WRITER_EXIT') {
            setIsReadOnly(true);
            return true;

        } else if (lastChat.chatType === 'FORCE_OUT') {
            const userNumberIndex = lastChat.message.indexOf('익명') + '익명'.length;
            const userNumberString = lastChat.message.substring(userNumberIndex, lastChat.message.indexOf('님'));
            if (parseInt(userNumberString) === myUserNum) { //내보내진 대상이 나일때
                setIsReadOnly(true);
                return true;
            }
            return false;
        }
        return false;
    }

    //3. 채팅 보내기
    const sendChat = () => {
        if (chat === '')
            return;
        clientRef.current.publish({
            destination: `/pub/chatRoom/${chatRoomId}`,
            body: JSON.stringify({
                userId: myUserId,
                chatType: "CHAT",
                message: chat,
            }),
        });

        setChat("");
    };

    useEffect(() => {
        scrollHandler();
        if (chatList.length > 0 && clientRef.current.connected) {
            const isValid = lastChatChecker(chatList);
            if (isValid) {
                clientRef.current.unsubscribe(); //구독 해제
                clientRef.current.deactivate(); //웹소켓 연결 해제
            }
        }
    }, [chatList]);

    useEffect(() => {
        scrollHandler();
        if (isReadOnly && clientRef.current.connected) {
            clientRef.current.unsubscribe(); //구독 해제
            clientRef.current.deactivate(); //웹소켓 연결 해제
        }
    }, [isReadOnly]);

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

    const handleAccount = (newAcc) => {
        setAccountNumber(newAcc);
    }

    const handleFuncPannel = (object) => {
        if (object === 'chatRoomFunc') {
            setIsOpenChatRoomFunc(false);
        } else if (object === 'chatFunc') {
            setIsOpenChatFunc(false);
        }
    }

    //채팅 화면 구성
    const msgBoxHandler = () => {
        return chatList.map((item, idx) => {
            switch (item.chatType) {
                case 'JOIN':
                    return (
                        <div className='infoMsg_container' key={idx}>
                            {item.message}
                        </div>
                    );
                case 'EXIT':
                    return (
                        <div className='infoMsg_container' key={idx}>
                            {item.message}
                        </div>
                    );
                case 'RECRUITMENT_FINISH':
                    return (
                        <div className='infoMsg_container' key={idx}>
                            {item.message}
                        </div>
                    );
                case 'ORDER_FINISH':
                    return (
                        <div className='orderFinishChat_container' key={idx}>
                            <div className='infoMsg_icon_container'>
                                <img className='infoMsg_icon1' src={orderFinish} alt='주문완료'/>
                            </div>
                            <span>글쓴이가 주문을 완료했어요!</span>
                        </div>
                    );
                case 'ACCOUNT_EDIT':
                    return (
                        <div className='accountEditChat_container' key={idx}>
                            <div className='infoMsg_icon_container'>
                                <img className='infoMsg_icon2' src={account} alt='계좌변경'/>
                            </div>
                            <span>글쓴이가 송금 계좌를 수정했어요!</span>
                        </div>
                    );
                case 'WRITER_EXIT':
                    return (
                        <div className='infoMsg_container' key={idx}>
                            {item.message}
                        </div>
                    );
                case 'FORCE_OUT':
                    return (
                        <div className='infoMsg_container' key={idx}>
                            {item.message}
                        </div>
                    );
                case 'CHAT':
                    if (item.userId !== myUserId && item.userNumber === 0) {
                        return (
                            <div className='othersChat_container' id={`chat_${idx}`} key={idx}>
                                <span
                                    className='sender'
                                    onClick={() => {
                                        !isOpenChatFunc ? setIsOpenChatFunc(true) : setIsOpenChatFunc(false);
                                        setOthersUserNum(item.userNumber);
                                        setChatIdx(`chat_${idx}`);}}>
                                    글쓴이
                                </span>
                                <div className='othersChat_horizontal_container'>
                                    <div className='othersChat_message'>{item.message}</div>
                                    {/*{
                                        isOpenChatFunc && othersUserNum === item.userNumber && `chat_${idx}` === chatIdx
                                            ? <FuncPannel userId={item.userId} userNumber={myUserNum} type='chat' chatRoomId={chatRoomId} pannelHandler={handleFuncPannel}/>
                                            : <></>
                                    }*/}
                                </div>
                            </div>
                        );
                    } else if (item.userId === myUserId) {
                        return (
                            <div className='myChat_container' id={`chat_${idx}`} key={idx}>
                                <span className='chat_content'>{item.message}</span>
                            </div>
                        )
                    } else {
                        return (
                            <div className='othersChat_container' id={`chat_${idx}`} key={idx}>
                                <span
                                    className='sender'
                                    onClick={() => {
                                        !isOpenChatFunc ? setIsOpenChatFunc(true) : setIsOpenChatFunc(false);
                                        setOthersUserNum(item.userNumber);
                                        setChatIdx(`chat_${idx}`);}}>
                                    {item.userNumber === null ? `(알수없음)` : `익명${item.userNumber}`}
                                </span>
                                <div className='othersChat_horizontal_container'>
                                    <div className='othersChat_message'>{item.message}</div>
                                    {
                                        isOpenChatFunc && othersUserNum === item.userNumber && `chat_${idx}` === chatIdx
                                            ? <FuncPannel userId={item.userId} userNumber={myUserNum} type='chat' chatRoomId={chatRoomId} pannelHandler={handleFuncPannel}/>
                                            : <></>
                                    }
                                </div>
                            </div>
                        );
                    }
            }
        });
    }

    //페이지  첫 렌더링 시
    useEffect( () => {
        if (!loggedIn()) {
            alert('로그인이 필요합니다');
            navigate('/signin');
            return; // 로그인되지 않은 경우 바로 리턴
        }
        connect();

        // 채팅방 정보 가져오기
        getChatInfo(accessToken)
            .then(data => {
                setDeliveryId(data.deliveryId);
                setDeliveryDeleted(data.deliveryDeleted);
                setTitle(data.title);
                setMaxPeople(data.maxPeople);
                setChatRoomUserCnt(data.chatRoomUserCnt);
                setOrderTime(data.orderTime);
                setAccountNumber(data.accountNumber);
                setMyUserId(data.getRequestUserId);
                setMyUserNum(data.getRequestUserNumber);

                // 이전 채팅 내역 가져오기
                return getPrevChatList(accessToken, 0, 20);
            })
            .then(data => {
                const chatArr = data.messages.reverse();
                setChatList(prevChatList => [...chatArr]);
                setChatPage(chatPage => chatPage + 1);

                if (chatArr.length > 0) {
                    const isValidInner = lastChatChecker(chatArr);
                    if (isValidInner && !deliveryDeleted) {
                        setIsReadOnly(true);
                    }
                }

                scrollHandler();
            })
            .catch(error => {
                alert(error);
            });

        return () => {
            console.log('화면 나감');
        }
    }, []);

    const handleScroll = () => {
        if (scrollRef.current.scrollTop === 0 && hasLeftMessage) {
            loadMoreMessage();
        }
    };

    const loadMoreMessage = async () => {
        try {
            const prevMessages = await getPrevChatList(accessToken, chatPage)
                .then(data => {
                    setChatPage(chatPage => chatPage + 1);
                    return data.messages;
                });


            if (prevMessages.length === 0) {
                setHasLeftMessage(false); // 더 이상 이전 메시지가 없을 경우 플래그를 false로 설정
            } else {
                // 이전 메시지가 있는 경우 기존 메시지 배열 앞에 추가
                const reverseArr = prevMessages.reverse();
                const uniqueNewMessages = reverseArr.filter(newMessage => !chatList.some(existingMessage => existingMessage.chatId === newMessage.chatId));
                setChatList(prevChatList => [...uniqueNewMessages, ...prevChatList]);
            }
        } catch (error) {
            console.error("Error loading more messages:", error);
        }
    }

    const placeholder = () => {
        if (isReadOnly) {
            return '더 이상 채팅을 보낼 수 없습니다.';
        } else {
            return '메세지를 입력하세요.'
        }
    }
    return (
        <>
            <div className='chat_title_container'>
                <div className='chatRoom_upper_bar'>
                    <img className='chatRoom_upper_icon' src={arrow_left} alt='뒤로가기' onClick={() => navigate('/chat')}/>
                    <span className='chat_title'>{title}</span>
                    <img className='chatRoom_upper_icon' src={function_button} alt='더보기' onClick={() => {!isOpenChatRoomFunc ? setIsOpenChatRoomFunc(true) : setIsOpenChatRoomFunc(false)}}/>
                    {isOpenChatRoomFunc ? <FuncPannel userNumber={myUserNum} type='title' accountChange={handleAccount} pannelHandler={handleFuncPannel} deliveryId={deliveryId} chatRoomId={chatRoomId}/> : <></>}
                </div>
                <div className='chatRoom_orderInfo'>
                    현재 배달팟 인원
                    <div className='chatRoom_people'>{`${chatRoomUserCnt}/${maxPeople}`}</div>
                    주문 예정 시각
                    <div className='chatRoom_orderTime'>{orderTime}</div>
                </div>
                <div className='chatRoom_accountInfo'>{accountNumber}</div>
            </div>
            <div className='chat_container'>
                <div className='chat_scroll_container' ref={scrollRef} onScroll={handleScroll}>
                    <div className='chatRoom_chatList_container'>{msgBoxHandler()}</div>
                </div>
                <div className='chatRoom_bottom_container'>
                    <div className='chatRoom_input_container'>
                        <textarea className='chatRoom_input_area' placeholder={placeholder()} ref={inputRef} value={chat} onChange={onChatChange} readOnly={isReadOnly}
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

export default ChatRoom;