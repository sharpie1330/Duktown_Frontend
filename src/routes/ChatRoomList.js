import React, {useContext, useEffect, useState} from "react";
import function_button from '../assets/function_button.png';
import ListView from "../components/ListView";
import '../css/ChatRoomList.css';
import AccessTokenContext from "../AccessTokenContext";
import arrow_left from "../assets/arrow_left.png"
import Button from "../components/Button";
function ChatRoomList() {
    const serverUrl = "http://localhost:8080";
    const apiUrl = serverUrl + "/chatRoom";
    const { accessToken } = useContext(AccessTokenContext);
    const [chatRoomArr, setChatRoomArr] = useState([]);
    const [isOpenFunc, setIsOpenFunc] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

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
                    if (errorResponse.errorMessage.includes('Token')) {
                        window.open('http://localhost:3000/signin', '_self');
                    } else {
                        throw new EvalError(errorResponse.errorMessage);
                    }
                });
            }
        } catch (err) {
            console.log('getChatRoomList error: ' + err);
        }
    }
    useEffect(() => {
        getChatRoomList(apiUrl, accessToken).then(data => {
            setChatRoomArr(data.chatRooms);
        });

    }, []);

    const handelEdit = () => {
        try {
            setIsOpenFunc(false);
            setIsEdit(true);
        } catch (error) {
            if (error.errorMessage.includes('Token')) {
                window.open('http://localhost:3000/signin', '_self');
            } else {
                throw new EvalError(error.errorMessage);
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
                        if (errorResponse.errorMessage.includes('Token')) {
                            window.open('http://localhost:3000/signin', '_self');
                        } else {
                            throw new EvalError(errorResponse.errorMessage);
                        }
                    });
                }
            } catch (err) {
                console.log('getChatRoomList error: ' + err);
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
        console.log('chatRoom List updated');
    }, [chatRoomArr])

    return (
        <>
            <div className='classRoom_list_body_container'>
                <div className='chatRoom_list_title_container'>
                    {isEdit ? <img className='chatRoom_list_edit_icon' src={arrow_left} alt='편집 취소' onClick={() => setIsEdit(false)}/> : <></> }
                    <span>배달팟 채팅방</span>
                    {isEdit ? <Button styleClass='blue_rec_btn' label='나가기' onClick={handleChatOut}/> : <img className='chatRoom_list_title_icon' src={function_button} alt='더보기' onClick={() => {!isOpenFunc ? setIsOpenFunc(true) : setIsOpenFunc(false)}}/>}
                    {isOpenFunc
                        ? <div className='funcPannel_container'>
                            <div className='funcPannel_edit' onClick={handelEdit}>
                                편집
                            </div>
                        </div>
                        : <></>}
                </div>
                <div className='chatRoom_list_container'>
                    <ListView
                        tableFor='chatRoom'
                        items={chatRoomArr}
                        edit={isEdit}
                        handler={handleSelectedItemsChange}
                    />
                </div>
            </div>
        </>
    )
}

export default ChatRoomList;