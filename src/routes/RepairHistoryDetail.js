import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import arrow_left from "../assets/arrow_left.png";
import '../css/RepairHistoryDetail.css';
import AccessTokenContext from "../AccessTokenContext";
function RepairHistoryDetail() {
    const navigate = useNavigate();
    const { accessToken } = useContext(AccessTokenContext);
    let { id } = useParams();
    {/*임시데이터*/}
    let title = '가온1관 412호 전윤하';
    let requestDate = '2023.12.13.';
    let content = '에어컨이 안 나오는데 리모콘 문제인지 확인부탁드립니다.';
    let confirmStatus = true;
    let confirmDate = '2023.12.13.';
    let resolutionStatus = 'done';
    let resolutionDate = '2023.12.14.';

    /*useEffect(() => {
        const apiUrl = `http://localhost:8080/repairApply/${id}`;
        const requestData = {
            "id": id
        }

        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestData),
        }

        fetch(apiUrl, request)
            .then((request) => {
                if (request.ok)
                    return request.json();
                else
                    throw new Error(request.errorMessage);
            })
            .then((data) => {
                title = `${data.hallName} ${data.room} ${name}`;
                requestDate = data.date;
                content = data.content;
                confirmStatus = data.confirm;
                confirmDate = data.confirmDate;
                resolutionStatus = data.resolution;
                resolutionDate = data.resolutionDate;
            })
            .catch((error) => {
                console.log(error.errorMessage);
                alert('페이지를 로드하던 중 문제가 발생했습니다.');
            })
    }, []);*/

    return (
        <>
            <div className='repairHistoryDetail_title_container'>
                <img className='repairHistoryDetail_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/repairs/historys?page=1');}}/>
                수리 요청 내역
            </div>
            <div className='repairHistoryDetail_content_container'>
                <p className='content_title'>{title}</p>
                <p className='request_date'>{requestDate}</p>
                <p className='content'>{content}</p>
                <hr/>
                <div className='repairHistoryDetail_confirm_container'>
                    <p className='confirmStatus'>{confirmStatus ? '확인' : '미확인'}</p>
                    <p className='confirmDate'>{confirmStatus ? confirmDate : null}</p>
                </div>
                <div className='repairHistoryDetail_resolution_container'>
                    <p className='resolutionStatus'>{resolutionStatus === 'done' ? '해결' : '미해결'}</p>
                    <p className='resolutionDate'>{resolutionStatus ? resolutionDate : null}</p>
                </div>
            </div>
        </>
    )
}

export default RepairHistoryDetail;