import React, {useContext, useEffect, useState} from "react";
import AccessTokenContext from "../AccessTokenContext";
import arrow_left from "../assets/arrow_left.png";
import {useNavigate} from "react-router-dom";
import '../css/MyUnit.css';
import ListView from "../components/ListView";

function MyUnit(){
    const navigate = useNavigate();
    const [unitArr, setUnitArr] = useState([]);
    const { accessToken } = useContext(AccessTokenContext);
    const serverUrl = 'http://localhost:8080';

    useEffect(() => {
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
                    throw new Error(response.errorMessage);
                }
            })
            .then((data) => {
                setUnitArr(data.content);
            })
            .catch((error) => {
                console.log(error.errorMessage);
                alert('페이지 로딩 중 오류가 발생했습니다.');
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