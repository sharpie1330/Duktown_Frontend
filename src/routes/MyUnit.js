import React, {useEffect, useState} from "react";
import arrow_left from "../assets/arrow_left.png";
import {useNavigate} from "react-router-dom";
import '../css/MyUnit.css';
import ListView from "../components/ListView";

function MyUnit(){
    const navigate = useNavigate();
    const [unitArr, setUnitArr] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const serverUrl = 'http://localhost:8080';

    useEffect( () => {
        if (accessToken === '' || accessToken === undefined || accessToken === null) {
            navigate('/signin');
        }

        const unitUrl = serverUrl + '/my/units';
        fetch(unitUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
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
                setUnitArr(data.content);
            })
            .catch((errorResponse) => {
                if (errorResponse.errorMessage.includes('Token') || errorResponse.errorMessage === undefined) {
                    window.open('http://localhost:3000/signin', '_self');
                } else {
                    throw new EvalError(errorResponse.errorMessage);
                }
            });
    }, []);
    return (
        <>
            <div>
                <div className='myUnit_title_container'>
                    <img className='myUnit_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/myPage');}}/>
                    나의 유닛
                </div>
                <div className='myUnit_list_container'>
                    <ListView
                        tableFor='myUnit'
                        items={unitArr}
                    />
                </div>
            </div>
        </>
    );
}

export default MyUnit;