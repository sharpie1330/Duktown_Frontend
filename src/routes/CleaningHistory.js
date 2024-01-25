import React, {useEffect, useState} from "react";
import arrow_left from "../assets/arrow_left.png";
import {useNavigate} from "react-router-dom";
import '../css/CleaningHistory.css';
import ListView from "../components/ListView";

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
        if (accessToken === '' || accessToken === undefined || accessToken === null) {
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
                if (response.errorMessage.includes('Token') || response.errorMessage === undefined) {
                    window.open('http://localhost:3000/signin', '_self');
                } else {
                    throw new EvalError(response.errorMessage);
                }
            }
        })
            .then((data) => {
                console.log(data.content);
                setCleaningHistroyArr(data.content)
            })
            .catch((error) => {
                console.log(error);
                if (error.errorMessage.includes('Token') || error.errorMessage === undefined) {
                    window.open('http://localhost:3000/signin', '_self');
                } else {
                    throw new EvalError(error.errorMessage);
                }
            });
    }, []);

    return (
        <>
            <div className='cleaningHistory_title_container'>
                <img className='cleaningHistory_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/unit');}}/>
                청소 내역
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