import React from "react";
import arrow_left from "../assets/arrow_left.png";
import information_icon from "../assets/information.png";
import '../css/MyPenalty.css';
import {useNavigate} from "react-router-dom";
function MyPenalty() {
    const navigate = useNavigate();

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
                벌점 내역이 없습니다.
            </div>
        </>
    );
}

export default MyPenalty;