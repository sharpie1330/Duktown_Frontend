import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import arrow_left from "../assets/arrow_left.png";
import '../css/RepairHistoryDetail.css';
import loggedIn from "../utils";
function RepairHistoryDetail() {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const params = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [checked, setChecked] = useState(false);
    const [solved, setSolved] = useState(false);
    const serverUrl = process.env.REACT_APP_BASEURL;

    useEffect(() => {
        if(!loggedIn()){
            alert('로그인이 필요합니다');
            navigate('/signin');
        }

        const apiUrl = serverUrl + `/repairApply/${params.id}`;
        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        }

        fetch(apiUrl, request)
            .then((response) => {
                if (response.ok)
                    return response.json();
                else {
                    return response.json().then(errorData => {
                        if (errorData.errorMessage && (errorData.errorMessage.includes('Token') || errorData.errorMessage === undefined)) {
                            window.open('http://localhost:3000/signin', '_self');
                        } else {
                            throw new EvalError(errorData.errorMessage);
                        }
                    });
                }
            })
            .then((data) => {
                let hallName = '';
                if (data.hallName === 1){
                    hallName = '가온 1관';
                } else if (data.hallName === 2) {
                    hallName = '가온 2관';
                } else if (data.hallName === 0) {
                    hallName = '국제기숙사';
                }
                setTitle(`${hallName} ${data.position}`);
                setContent(data.content);
                setChecked(data.checked);
                setSolved(data.solved);
            })
            .catch((errorResponse) => {
                alert(errorResponse);
            })
    }, [accessToken, params.id]);

    return (
        <>
            <div className='title_container'>
                <div>
                    <img className='repairHistoryDetail_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/repairs/historys?page=1');}}/>
                    수리 요청 내역
                </div>
            </div>
            <div className='repairHistoryDetail_content_container'>
                <p className='content_title'>{title}</p>
                {/*<p className='request_date'>{requestDate}</p>*/}
                <p className='content'>{content}</p>
                <hr/>
                <div className='repairHistoryDetail_confirm_container'>
                    <p className='confirmStatus'>{checked ? '확인' : '미확인'}</p>
                    {/*<p className='confirmDate'>{confirmStatus ? confirmDate : null}</p>*/}
                </div>
                <div className='repairHistoryDetail_resolution_container'>
                    <p className='resolutionStatus'>{solved === 'done' ? '해결' : '미해결'}</p>
                    {/*<p className='resolutionDate'>{resolutionStatus ? resolutionDate : null}</p>*/}
                </div>
            </div>
        </>
    )
}

export default RepairHistoryDetail;