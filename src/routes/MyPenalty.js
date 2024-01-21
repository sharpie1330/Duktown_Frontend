import React, {useContext, useEffect, useState} from "react";
import arrow_left from "../assets/arrow_left.png";
import information_icon from "../assets/information.png";
import '../css/MyPenalty.css';
import {useNavigate} from "react-router-dom";
import AccessTokenContext from "../AccessTokenContext";
import ListView from "../components/ListView";
function MyPenalty() {
    const navigate = useNavigate();
    const [point, setPoint] = useState(null);
    const [pointHistory, setPointHistory] = useState([]);
    const { accessToken } = useContext(AccessTokenContext);
    const serverUrl = 'http://localhost:8080';
    useEffect(() => {
        const apiUrl = serverUrl + '/my/penaltyPoints';
        fetch(apiUrl, {
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
                console.log(data);
                if (data.totalPenaltyPoint === null) {
                    setPoint(0);
                } else {
                    setPoint(data.totalPenaltyPoint);
                }
                setPointHistory(data.penaltyPointsList);
            })
            .catch((error) => {
                console.log(error.errorMessage);
                alert('페이지 로딩 중 오류가 발생했습니다.');
            });
    }, []);

    return (
        <>
            <div className='myPenalty_title_container'>
                <div className='myPenalty_title_horizontal_container'>
                    <img className='myPenalty_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/myPage');}}/>
                    벌점 관리
                </div>
                <img className='myPenalty_info_icon' src={information_icon} alt="벌점 기준 보기" onClick={()=>{navigate('/penalty');}}/>
            </div>
            <div className='myPenalty_body_container'>
                <div className='myPenalty_total_container'>
                    이번 학기 총 벌점
                    <div className='myPenalty_total_score'>{point<10 ? `0${point}점` : `${point}점`}</div>
                </div>
                <div className='myPenalty_list_container'>
                    <ListView
                        tableFor='myPenalty'
                        items={pointHistory}
                    />
                </div>
            </div>
        </>
    );
}

export default MyPenalty;