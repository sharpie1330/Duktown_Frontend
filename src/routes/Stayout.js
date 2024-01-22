import React, { useState, useEffect, useContext } from 'react';
import Calendar from "react-calendar";
import Draggable from "react-draggable";
import { useNavigate } from 'react-router-dom';
import arrow_left from '../assets/arrow_left.png';
import Button from '../components/Button';
import '../css/StayOut.css';
import moment from "moment";
import arrow_right from '../assets/arrow_right.png';
import Modal from "react-modal";
import {customModal, customModal3} from "../customModalConfig";
import DaumPostCode from "react-daum-postcode";
import AccessTokenContext from "../AccessTokenContext";
import ListView from "../components/ListView";

function Stayout() {
    const navigate = useNavigate();
    //신청
    const [rangeStart, setRangeStart] = useState('');
    const [rangeEnd, setRangeEnd] = useState('');
    const [range, setRange] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modal2IsOpen, setModal2IsOpen] = useState(false);
    const [address, setAddress] = useState("");
    const [specAddress, setSpecAddress] = useState("");
    const [addrModalOpen, setAddrModalOpen] = useState(false);
    const [zonecode, setZonecode] = useState("");
    const [inputReason, setReason] = useState('');
    const [rangeModalOpen, setRangeModalOpen] = useState(false);
    const [recentAddr, setRecentAddr] = useState(false);
    //화면 전환
    const [currentPage, setCurrentPage] = useState('apply');
    //조회
    const [availablePeriod, setAvailablePeriod] = useState(null);
    const [stayoutArr, setStayoutArr] = useState([]);
    const { accessToken } = useContext(AccessTokenContext);

    const initStayout = async (url, atk) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${atk}`,
                },
                method: 'GET',
            });

            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(errorResponse => {
                    if (errorResponse.errorMessage === '유효하지 않은 JWT Token입니다.') {
                        window.open('http://localhost:3000/signin', '_self');
                    } else {
                        throw new EvalError(errorResponse.errorMessage);
                    }
                });
            }
        } catch (err) {
            console.log('getChatRoomList error: ' + err);
        }
    }

    //외박신청 규정 확인 여부
    const [showRule, setShowRule] = useState(true);
    useEffect(() => {
        localStorage.setItem('hideRule', 'false');
        const isRuleHidden = localStorage.getItem('hideRule');
        if (isRuleHidden === 'true') {
            setShowRule(false);
        }

        const apiUrl = serverUrl + '/sleepoverApply/student?pageNo=1';
          // JSON을 파싱하기 위해 response.json()을 사용
        initStayout(apiUrl, accessToken)
        .then(data => {
            console.log(data);
            setAvailablePeriod(data.availablePeriod);
            if (data.content !== undefined){
                setStayoutArr(data.content);
            }
        })
        .catch(error => console.error('Error:', error));

    }, []);

    useEffect(() => {
        console.log(stayoutArr);
        console.log(availablePeriod);
    }, [availablePeriod, stayoutArr]);

    // 다시 보지 않기 선택
    const [isChecked, setIsChecked] = useState(false);
    const handleChecked = () => {
        setIsChecked(!isChecked);
    }
    const modal2Submit = () => {
        if (isChecked) {
            hideRule();
        }
        sendData();

        localStorage.setItem('recentAddr',
            JSON.stringify({
                "address": address,
                "specAddress": specAddress,
                "zonecode": zonecode
            }))
        setModal2IsOpen(false);
    }
    const hideRule = () => {
        localStorage.setItem('hideRule', 'true');
        setShowRule(false);
    }

    const chooseModalNext = () => {
        if (showRule) { //외박신청 규정을 보여줄 경우
            setModalIsOpen(false);
            setModal2IsOpen(true);
        } else {
            sendData();
            setModalIsOpen(false);
        }
    }

    //데이터 전송
    const serverUrl = 'http://localhost:8080'
    async function sendData() {
        const apiUrl = serverUrl + '/sleepoverApply';

        const requestData = {
            "startDate": new Date(rangeStart),
            "endDate": new Date(rangeEnd),
            "period": range,
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

        try {
            const response = await fetch(apiUrl, request);

            if (response.ok) {
                setModalIsOpen(false);
                setRange(0);
                setRangeEnd('');
                setRangeStart('');
                setAddress('');
                setSpecAddress('');
                setZonecode('');
                setReason('');
                alert("외박 신청이 전송되었습니다.");

                await new Promise(resolve => setTimeout(resolve, 5000));
                const data = await initStayout(apiUrl, accessToken);
                console.log(data);
                setAvailablePeriod(data.availablePeriod);
                if (data.content !== undefined) {
                    setStayoutArr(data.content);
                }
            } else {
                const errorResponse = await response.json();
                if (errorResponse.errorMessage === '유효하지 않은 JWT Token입니다.') {
                    window.open('http://localhost:3000/signin', '_self');
                } else {
                    return new EvalError(errorResponse.errorMessage);
                }
            }
        } catch (error) {
            setModalIsOpen(false);
            alert(error.errorMessage);
        }
    }
    const handleDateChange = date => {
        const setStartDate = moment(date[0]).format('YYYY.MM.DD');
        const setEndDate = moment(date[1]).format('YYYY.MM.DD');

        setRangeStart(setStartDate);
        setRangeEnd(setEndDate);
    }

    const weekendFilter = (startDate, endDate) => {
        const excludeDays = [5, 6, 0]; //금토일
        const current = new Date(startDate);
        const end = new Date(endDate);
        const result = [];

        while (current <= end) {
            const day = current.getDay();

            if (!excludeDays.includes(day)){
                result.push(current);
            }

            current.setDate(current.getDate() + 1);
        }

        return result.length;
    }

    useEffect(()=>{
        const rangeVal = weekendFilter(rangeStart, rangeEnd);
        if (rangeVal >= 7)
            setRangeModalOpen(true);
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

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('recentAddr'));
        if (recentAddr && localData) {
            setAddress(localData.address);
            setSpecAddress(localData.specAddress);
            setZonecode(localData.zonecode);
        } else if (recentAddr && !localData){
            alert('최근 외박 신청지가 없습니다.');
            setRecentAddr(false);
        }
    }, [recentAddr]);

    const renderPage = () => {
        switch (currentPage) {
            case 'apply':
                return (
                    <>
                        <div className='stayout_title_container'>
                            <div className='stayout_title_left_content'>
                                <img className='title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/home');}}/>
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
                                style={customModal}>
                                <div className="stayout_modal_container">
                                    외박 신청서를 보낼까요?
                                    <div className="stayout_modal_btn_container">
                                        <Button styleClass="modal_btn_no" label="아니오" onClick={()=>setModalIsOpen(false)} />
                                        <Button styleClass="modal_btn_yes" label="예" onClick={chooseModalNext} />
                                    </div>
                                </div>
                            </Modal>
                            <Modal
                                isOpen={modal2IsOpen}
                                onRequestClose={()=> setModal2IsOpen(false)}
                                style={customModal3}>
                                <div className="stayout_final_modal">
                                    <div className="stayout_final_modal_title">외박신청 규정</div>
                                    <div className="stayout_final_modal_content">&#183; 외박은 당일 22시 전까지만 신청 가능</div>
                                    <div className="stayout_final_modal_content">&#183; 무단 외박 시 벌점 3점 부과</div>
                                    <div className="stayout_final_modal_content">&#183; 새벽 1~5시 사이에 귀소시 벌점 부과</div>
                                    <div className="stayout_final_modal_content">&#183; 7일 초과 외박 시 장기 외박 사유서 제출 필수</div>
                                    <div className="stayout_setShowRule_container">
                                        <input type='checkbox' className='checkbox' checked={isChecked} onChange={handleChecked}/>
                                        <span>다시 보지 않기</span>
                                    </div>
                                    <div className="stayout_final_modal_btn_container">
                                        <Button styleClass="modal_btn_yes" label="확인" onClick={modal2Submit} />
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
                                <input type='text' className='range_field' value={range || 0 } disabled={true}/>
                                일
                                <Modal isOpen={rangeModalOpen} onRequestClose={()=> setRangeModalOpen(false)} style={customModal}>
                                    <div className='range_modal_container'>
                                        <span>7일 초과 외박 신청 시<br/>장기 외박 사유서를 제출해야 해요</span>
                                        <div className="range_modal_btn_container">
                                            <Button styleClass="range_modal_btn_cancel" label="취소" onClick={()=>setRangeModalOpen(false)} />
                                            <Button styleClass="range_modal_btn_download" label="사유서 다운받기" onClick={() => {window.open('https://www.duksung.ac.kr/cmmn/download.do?idx=129506', '_blank'); setRangeModalOpen(false);}}/>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                            <div className="stayout_input_container">
                                <p>머무르는 곳의 주소</p>
                                <div className="stayout_addr_vertical_container">
                                    <div className="recent_selection_container">
                                        <input className='stayout_round_checkbox' type='checkbox' checked={recentAddr} onChange={() =>  {recentAddr ? setRecentAddr(false) : setRecentAddr(true)}}/>
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
                        <Draggable axis='y' bounds={{top: -(window.innerHeight * 0.78), bottom:0}}>
                            <div className='stayout_drag_container'>
                                <div className='stayout_scroll_tab'>
                                    외박 신청 내역
                                    <div className='stayout_scroll_vertical_container'>
                                        이번 학기 남은 외박
                                        <div className='stayout_day_left'>
                                            {availablePeriod}
                                        </div>
                                    </div>
                                </div>
                                <div className='stayout_history_list_container'>
                                    <ListView
                                        tableFor='stayout'
                                        items={stayoutArr}
                                    />
                                </div>
                            </div>
                        </Draggable>
                    </>
                );
            case 'reason':
                return (
                    <>
                        <div className='stayout_title_container'>
                            <div className='stayout_title_left_content'>
                                <img className='title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=> {setReason(''); setCurrentPage('apply');}}/>
                                외박 신청 사유
                            </div>
                            <Button
                                label="확인"
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