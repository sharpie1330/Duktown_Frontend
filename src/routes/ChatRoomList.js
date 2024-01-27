import React, {useEffect, useState} from "react";
import function_button from '../assets/function_button.png';
import ListView from "../components/ListView";
import '../css/ChatRoomList.css';
import arrow_left from "../assets/arrow_left.png"
import Button from "../components/Button";
import Upperbar from "../components/UpperBar";
import BottomBar from "../components/BottomBar";
import {useNavigate} from "react-router-dom";
import loggedIn from "../utils";

function ChatRoomList() {
    const navigate = useNavigate();
    const serverUrl = process.env.REACT_APP_BASEURL;
    const apiUrl = serverUrl + "/chatRoom";
    const [chatRoomArr, setChatRoomArr] = useState([]);
    const [isOpenFunc, setIsOpenFunc] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    const handleSelectedItemsChange = (newSelectedItems) => {
        setSelectedItems(newSelectedItems);
    };

    //채팅방 목록 가져오기
    const getChatRoomList = async (url, atk) => {
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
                    if (errorResponse.errorMessage.includes('Token') || errorResponse.errorMessage === undefined) {
                        window.open('http://localhost:3000/signin', '_self');
                    } else {
                        throw new EvalError(errorResponse.errorMessage);
                    }
                });
            }
        } catch (errorResponse) {
            if (errorResponse.errorMessage.includes('Token') || errorResponse.errorMessage === undefined) {
                window.open('http://localhost:3000/signin', '_self');
            } else {
                throw new EvalError(errorResponse.errorMessage);
            }
        }
    }
    useEffect( () => {
        if(!loggedIn()){
            alert('로그인이 필요합니다');
            navigate('/signin');
        } else {
            getChatRoomList(apiUrl, accessToken).then(data => {
                setChatRoomArr(data.chatRooms);
            });
        }

    }, []);

    const handelEdit = () => {
        try {
            setIsOpenFunc(false);
            setIsEdit(true);
        } catch (errorResponse) {
            if (errorResponse.errorMessage.includes('Token') || errorResponse.errorMessage === undefined) {
                window.open('http://localhost:3000/signin', '_self');
            } else {
                throw new EvalError(errorResponse.errorMessage);
            }
        }
    }

    const handleChatOut = () => {
        selectedItems.map(async chatRoomId => {
            const apiUrl = serverUrl + `/chatRoom/${chatRoomId}`;
            try {
                const response = await fetch(apiUrl, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    return response.json().then(errorResponse => {
                        if (errorResponse.errorMessage.includes('Token') || errorResponse.errorMessage === undefined) {
                            window.open('http://localhost:3000/signin', '_self');
                        } else {
                            throw new EvalError(errorResponse.errorMessage);
                        }
                    });
                }
            } catch (errorResponse) {
                if (errorResponse.errorMessage.includes('Token') || errorResponse.errorMessage === undefined) {
                    window.open('http://localhost:3000/signin', '_self');
                } else {
                    throw new EvalError(errorResponse.errorMessage);
                }
            }
        })

        alert('선택한 채팅방에서 나갔습니다.');

        setIsEdit(false);
        getChatRoomList(apiUrl, accessToken).then(data => {
            setChatRoomArr(data.chatRooms);
        });
    }

    useEffect(() => {
        console.log('selectedItems updated');
    }, [selectedItems])

    useEffect(() => {
        setView();
    }, [chatRoomArr])

    useEffect(() => {
        const fetchChatRoomList = async () => {
            if (!loggedIn()) {
                alert('로그인이 필요합니다');
                navigate('/signin');
            } else {
                try {
                    const data = await getChatRoomList(apiUrl, accessToken);
                    setChatRoomArr(data.chatRooms);
                } catch (error) {
                    console.error('Error fetching chat room list:', error);
                    // 에러 처리
                }
            }
        };

        fetchChatRoomList();
    }, [isOpenFunc, isEdit]);

    const setView = () => {
        if (chatRoomArr.length > 0) {
            if (isEdit) {
                return <Button styleClass='blue_rec_btn' label='나가기' onClick={handleChatOut}/>
            } else {
                return <img className='chatRoom_list_title_icon' src={function_button} alt='더보기' onClick={() => {!isOpenFunc ? setIsOpenFunc(true) : setIsOpenFunc(false)}}/>
            }
        } else {
            return <></>
        }
    }

    return (
        <>
            <Upperbar searchAvailable={false}/>
            <div className="center_content_container">
                <div className='classRoom_list_body_container'>
                    <div className='chatRoom_list_title_container'>
                        {isEdit ? <img className='chatRoom_list_edit_icon' src={arrow_left} alt='편집 취소' onClick={() => setIsEdit(false)}/> : <></> }
                        <span>배달팟 채팅방</span>
                        {setView()}
                        {isOpenFunc
                            ? <div className='funcPannel_container'>
                                <div className='funcPannel_edit' onClick={handelEdit}>
                                    편집
                                </div>
                            </div>
                            : <></>}
                    </div>
                    <div className='chatRoom_list_container'>
                        {
                            chatRoomArr.length > 0
                                ? <ListView
                                    tableFor='chatRoom'
                                    items={chatRoomArr}
                                    edit={isEdit}
                                    handler={handleSelectedItemsChange}
                                />
                                : <span>아직 참여한 배달팟이 없습니다</span>
                        }
                    </div>
                </div>
            </div>
            <BottomBar/>
        </>
    )
}

export default ChatRoomList;