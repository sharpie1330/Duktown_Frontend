import React, { useState, useRef, useEffect, useContext } from 'react';
import Calendar from "react-calendar";
import { useNavigate } from 'react-router-dom';
import arrow_left from '../assets/arrow_left.png';
import Button from '../components/Button';
import '../css/StayOut.css';
import moment from "moment";
import edit from '../assets/edit_blue.png'
import arrow_right from '../assets/arrow_right.png';
import Modal from "react-modal";
import customModal from "../customModalConfig";
import DaumPostCode from "react-daum-postcode";
import AccessTokenContext from "../AccessTokenContext";

function Stayout() {
    const navigate = useNavigate();
    const [rangeStart, setRangeStart] = useState();
    const [rangeEnd, setRangeEnd] = useState();
    const [range, setRange] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [address, setAddress] = useState("");
    const [specAddress, setSpecAddress] = useState("");
    const [addrModalOpen, setAddrModalOpen] = useState(false);
    const [zonecode, setZonecode] = useState("");
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

    const inputRef1 = useRef(null);
    const handleAddr = () => {
        setSpecAddress('');
        inputRef1.current.focus();
    }

    const [inputReason, setReason] = useState('');
    const inputRef2 = useRef(null);
    const handleReason = () => {
        setReason('');
        inputRef2.current.focus();
    }

    const customDay = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const customNextLabel = (
        <img src={arrow_right} alt='next month' style={{width: '21px', height: '21px'}}/>
    );

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
          <div className="stayout_calendar">
              <Calendar
                  formatDay={(locale, date) => moment(date).format("DD")}
                  formatShortWeekday={(locale, date) => customDay[date.getDay()]}
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
                  <input type='text' className='input_text' value={rangeStart || ""} disabled={true}/>
                  돌아오는 날짜
                  <input type='text' className='input_text' value={rangeEnd || ""} disabled={true}/>
              </div>
              <div className="calculate_day">
                  외박 일 수
                  <input type='text' className='range_field' value={range/86400000 || 0 + '일'} disabled={true}/>
              </div>
              <div className="stayout_input_container">
                  머무르는 곳의 주소
                  <div className="stayout_addr_vertical_container">
                      <div className="stayout_addr_container">
                          <input className='stayout_addr_field' value={address} readOnly={true} placeholder="도로명 주소"/>
                          <button type='button' className='search_addr_btn' onClick={() => setAddrModalOpen(true)}>
                              주소 검색
                          </button>
                          <Modal isOpen={addrModalOpen} ariaHideApp={false} onRequestClose={()=>setAddrModalOpen(false)}>
                              <DaumPostCode onComplete={addrCompleteHandler} />
                          </Modal>
                      </div>
                      <div className="stayout_specAddr_container">
                          <input type='text' className='stayout_specAddr_field' value={specAddress} onChange={(e) => setSpecAddress(e.target.value)} ref={inputRef1} placeholder="세부 주소"/>
                          <button type='button' className='edit_btn' onClick={handleAddr}>
                              <img className="edit_icon" alt="주소 수정하기" src={edit}/>
                          </button>
                      </div>
                  </div>
              </div>
              <div className="stayout_input_container">
                  사유
                  <div className="stayout_reason_container">
                      <input type='text' className='stayout_reason_field' value={inputReason} onChange={(e) => setReason(e.target.value)} ref={inputRef2}/>
                      <button type='button' className='edit_btn' onClick={handleReason}>
                          <img className="edit_icon" alt="사유 수정하기" src={edit}/>
                      </button>
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
}

export default Stayout;