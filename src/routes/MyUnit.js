import React, {useEffect, useState} from "react";
import arrow_left from "../assets/arrow_left.png";
import {useNavigate} from "react-router-dom";
import '../css/MyUnit.css';
import ListView from "../components/ListView";
import loggedIn from "../utils";

function MyUnit(){
    const navigate = useNavigate();
    const [unitArr, setUnitArr] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const serverUrl = process.env.REACT_APP_BASEURL;

    useEffect( () => {
        if(!loggedIn()){
            alert('로그인이 필요합니다');
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
                    return response.json().then(errorData => {
                        if (errorData.errorMessage && (errorData.errorMessage.includes('Token') || errorData.errorMessage === undefined)) {
                            window.open('http://www.duktown.site/signin', '_self');
                        } else {
                            throw new EvalError(errorData.errorMessage);
                        }
                    });
                }
            })
            .then((data) => {
                setUnitArr(data.content);
            })
            .catch((errorResponse) => {
                alert(errorResponse);
            });
    }, []);
    return (
        <>
                <div className='title_container'>
                    <div>
                        <img className='myUnit_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/myPage');}}/>
                        나의 유닛
                    </div>
                </div>
                <div className='myUnit_list_container'>
                    <ListView
                        tableFor='myUnit'
                        items={unitArr}
                    />
                </div>
        </>
    );
}

export default MyUnit;