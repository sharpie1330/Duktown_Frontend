import React, {useEffect, useState} from "react";
import arrow_left from "../assets/arrow_left.png";
import {useNavigate} from "react-router-dom";
import '../css/CleaningHistory.css';
import ListView from "../components/ListView";
import loggedIn from "../utils";

function CleaningHistory() {
    const navigate = useNavigate();
    const [cleaningHistroyArr, setCleaningHistroyArr] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const serverUrl = process.env.REACT_APP_BASEURL;
    const dummyData = [
        {cleaningDate: '2024-01-25', cleaned: false, checked: false},
        {cleaningDate: '2024-01-18', cleaned: true, checked: true},
        {cleaningDate: '2024-01-11', cleaned: true, checked: true},
        {cleaningDate: '2024-01-04', cleaned: true, checked: true},
    ]

    useEffect(() => {
        if(!loggedIn()){
            alert('로그인이 필요합니다');
            navigate('/signin');
        }

        const apiUrl = serverUrl + '/cleaning';
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return response.json().then(errorData => {
                    if (errorData.errorMessage && (errorData.errorMessage.includes('Token') || errorData.errorMessage === undefined)) {
                        window.open('https://www.duktown.site/signin', '_self');
                    } else {
                        throw new EvalError(errorData.errorMessage);
                    }
                });
            }
        })
            .then((data) => {
                setCleaningHistroyArr(data.content)
            })
            .catch((error) => {
                alert(error);
            });
    }, []);

    return (
        <>
            <div className='title_container'>
                <div>
                    <img className='cleaningHistory_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/unit');}}/>
                    청소 내역
                </div>
            </div>
            <div className='cleaningHistory_list_container'>
                <ListView
                    tableFor='cleaningHistory'
                    items={dummyData}
                />
            </div>
        </>
    );
}

export default CleaningHistory;