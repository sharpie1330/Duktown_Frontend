import React, {useContext, useEffect, useState} from "react";
import function_button from '../assets/function_button.png';
import TableView from "../components/TableView";
import '../css/ChatRoom.css';
import AccessTokenContext from "../AccessTokenContext";
function ChatRoom() {
    const serverUrl = "http://localhost:8080";
    const apiUrl = serverUrl + "/chatRoom";
    const { accessToken } = useContext(AccessTokenContext);
    const [chatRoomArr, setChatRoomArr] = useState([]);

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
                    throw new EvalError(errorResponse.errorMessage);
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

    }, [])

    return (
        <>
            <div className='chatRoom_list_container'>
                <TableView
                    tableFor='chatRoom'
                    items={chatRoomArr}
                />
            </div>
        </>
    )
}

export default ChatRoom;