import React, { useState, useEffect, useContext } from 'react';
import Calendar from "react-calendar";
import { useNavigate } from 'react-router-dom';
import arrow_left from '../assets/arrow_left.png';
import Button from '../components/Button';
import '../css/StayOut.css';
import moment from "moment";
import arrow_right from '../assets/arrow_right.png';
import Modal from "react-modal";
import customModal from "../customModalConfig";
import DaumPostCode from "react-daum-postcode";
import AccessTokenContext from "../AccessTokenContext";

function Stayout() {
    const navigate = useNavigate();
    const [rangeStart, setRangeStart] = useState('');
    const [rangeEnd, setRangeEnd] = useState('');
    const [range, setRange] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [address, setAddress] = useState("");
    const [specAddress, setSpecAddress] = useState("");
    const [addrModalOpen, setAddrModalOpen] = useState(false);
    const [zonecode, setZonecode] = useState("");
    const [inputReason, setReason] = useState('');
    const [currentPage, setCurrentPage] = useState('apply');
    const { accessToken } = useContext(AccessTokenContext);
    console.log(`atk: ${accessToken}`);

    const serverUrl = 'http://localhost:8080'
    function sendData() {
        const apiUrl = serverUrl + '/sleepoverApply';

        const requestData = {
            "startDate": new Date(rangeStart),
            "endDate": new Date(rangeEnd),
            "period": range/86400000,
            "zipcode": zonecode,
            "streetAddress": address,
            "detailAddress": specAddress,
            "reason": inputReason
        }

        console.log(requestData);

        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestData),
        }

        fetch(apiUrl, request)
            .then((response) => {
                if (response.ok)
                    return response; //TODO: response를 json 형식으로 주시는지 확인 필요
                else
                    throw new Error(response.errorMessage);
            })
            .then(() => {
                window.location.reload();
                setModalIsOpen(false);
                alert("외박 신청이 전송되었습니다.");
            })
            .catch((error) => {
                console.error(error.errorMessage);
                setModalIsOpen(false);
                alert(error.errorMessage);
            });
    }
    const handleDateChange = date => {
        const setStartDate = moment(date[0]).format('YYYY.MM.DD');
        const setEndDate = moment(date[1]).format('YYYY.MM.DD');

        setRangeStart(setStartDate);
        setRangeEnd(setEndDate);
    }

    useEffect(()=>{
        const rangeVal = new Date(rangeEnd) - new Date(rangeStart);
        setRange(rangeVal);
    }, [rangeStart, rangeEnd]);

    const addrCompleteHandler = data => {
        setZonecode(data.zonecode);
        setAddress(data.roadAddress);
        setAddrModalOpen(false);
    }

    const customDay = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const customNavigationLabel = ({ date }) => (
        <span className='navigationLabel'>{date.toLocaleDateString('en-US', { month: 'long'})}</span>
    );

    const customNextLabel = (
        <img src={arrow_right} alt='next month' style={{width: '21px', height: '21px', padding:0}}/>
    );

    const themeObj = {
        postcodeTextColor: "#FF6D4D", //우편번호 글자색
        emphTextColor: "#6A9CFD" //강조 글자색 FF6D4D
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'apply':
                return (
                    <>
                        <div className='stayout_title_container'>
                            <div className='stayout_title_left_content'>
                                <img className='title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/main');}}/>
                                외박 신청
                            </div>
                            <Button
                                label="신청하기"
                                styleClass="blue_rec_btn"
                                onClick={() => setModalIsOpen(true)}
                            />
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={()=>setModalIsOpen(false)}
                                style={customModal}> {/*추후 api로 연결*/}
                                <div className="unit_modal_container">
                                    외박 신청서를 보낼까요?
                                    <div className="unit_modal_btn_container">
                                        <Button styleClass="modal_btn_no" label="아니오" onClick={()=>setModalIsOpen(false)} />
                                        <Button styleClass="modal_btn_yes" label="예" onClick={sendData} />
                                    </div>
                                </div>
                            </Modal>
                        </div>
                        <div className='stayout_range_description'>
                            달력에서 외박 시작 날짜와 돌아오는 날짜를 선택해주세요
                        </div>
                        <div className="stayout_calendar">
                            <Calendar
                                formatDay={(locale, date) => moment(date).format("DD")}
                                formatShortWeekday={(locale, date) => customDay[date.getDay()]}
                                navigationLabel={customNavigationLabel}
                                onChange={handleDateChange}
                                selectRange={true}
                                next2Label={null}
                                nextLabel={customNextLabel}
                                prev2Label={null}
                                prevLabel={null}
                            />
                        </div>
                        <form className="stayout_form">
                            <div className="range_container">
                                외박 시작 날짜
                                <input type='text' className='input_text1' value={rangeStart || ""} disabled={true}/>
                                돌아오는 날짜
                                <input type='text' className='input_text2' value={rangeEnd || ""} disabled={true}/>
                            </div>
                            <div className="calculate_day">
                                외박 일 수
                                <input type='text' className='range_field' value={range/86400000 || 0 } disabled={true}/>
                                일
                            </div>
                            <div className="stayout_input_container">
                                <p>머무르는 곳의 주소</p>
                                <div className="stayout_addr_vertical_container">
                                    <div className="recent_selection_container">
                                        <input className='stayout_round_checkbox' type='checkbox'/>
                                        <span className="user_recent_selection">최근 외박 신청지 입력하기</span>
                                    </div>
                                    <div className="stayout_addrNzipcode_container">
                                        <div className='stayout_addr_horizontal_container'>
                                            <div className="stayout_zipcode_container">
                                                <input className='stayout_zipcode_field' value={zonecode} readOnly={true} />
                                            </div>
                                            <button type='button' className='search_addr_btn' onClick={() => setAddrModalOpen(true)}>
                                                주소 검색
                                            </button>
                                            <Modal isOpen={addrModalOpen} ariaHideApp={false} onRequestClose={()=>setAddrModalOpen(false)}>
                                                <DaumPostCode onComplete={addrCompleteHandler} theme={themeObj} style={{height:'100%'}}/>
                                            </Modal>
                                        </div>
                                        <div className="stayout_addr_container">
                                            <input className='stayout_addr_field' value={address} readOnly={true} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="stayout_input_container2">
                                상세 주소
                                <div className="stayout_specAddr_container">
                                    <input type='text' className='stayout_specAddr_field' value={specAddress} onChange={(e) => setSpecAddress(e.target.value)}/>
                                </div>
                            </div>
                            <div className="stayout_input_container">
                                <p>외박 사유</p>
                                <div className="stayout_reason_container">
                                    <textarea className='stayout_reason_field' value={inputReason} readOnly={true} onClick={() => setCurrentPage('reason')}/>
                                </div>
                            </div>
                        </form>
                        <p className="stayout_description">
                            *외박은 당일 22시 전까지만 신청 가능합니다.<br/>
                            &nbsp;무단 외박 시 벌점 3점이 부과됩니다.<br/>
                            &nbsp;새벽 1~5시 사이에 귀소시 벌점이 부과됩니다.
                        </p>
                    </>
                );
            case 'reason':
                return (
                    <>
                        <div className='stayout_title_container'>
                            <div className='stayout_title_left_content'>
                                <img className='title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=> {setReason(''); setCurrentPage('apply');}}/>
                                외박 신청
                            </div>
                            <Button
                                label="신청하기"
                                styleClass="blue_rec_btn"
                                onClick={() => setCurrentPage('apply')}
                            />
                        </div>
                        <div className='stayout_reason_input_container'>
                            <textarea className='stayout_reason_input' autoFocus={true} placeholder='외박을 신청하는 사유에 대해 알려주세요.' onChange={(e) => setReason(e.target.value)} value={inputReason}/>
                        </div>
                    </>
                );
        }
    }

    return (
        <>
            {renderPage()}
        </>
    );
}

export default Stayout;