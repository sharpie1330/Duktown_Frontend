import React, {useContext, useEffect, useState, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import { DateRange } from 'react-date-range';
import AccessTokenContext from "../AccessTokenContext";
import arrow_left from "../assets/arrow_left.png";
import calendar from "../assets/calendar.png";
import TableView from "../components/TableView";
import arrow_right from "../assets/arrow_right.png";
import Modal from "react-modal";
import search from '../assets/search.png';
import moment from "moment";
import '../css/NoticeList.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {customModal2} from "../customModalConfig";

function NoticeList() {
    const navigate = useNavigate();
    const [currentRenderPage, setCurrentRenderPage] = useState('listView');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSet, setCurrentPageSet] = useState(1);
    const [isComposing, setIsComposing] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showRangePicker, setShowRangePicker] = useState(false);
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection',
        },
    ]);
    const [limitPageSet, setLimitPageSet] = useState(5); {/*임시*/}
    const { accessToken } = useContext(AccessTokenContext);
    let items = [{id:1, date: '2023.12.18', title: '둘째줄로 잘 넘어가는지 테스트 지금 옆자리에 귀여운 강아지들이 앉았음'}, {id:2, date: '2023.12.09', title: '2번공지'}, {id:3, date: '2023.12.09', title: '테스트'}]; {/*목록 배열*/}
    const handlePreviousClick = () => {
        if (currentPageSet > 1) {
            setCurrentPageSet(currentPageSet - 1);
            setCurrentPage(5 * (currentPageSet - 1));
        }
    };
    const handleNextClick = () => {
        if (currentPageSet < limitPageSet) {
            setCurrentPageSet(currentPageSet + 1);
            setCurrentPage(5 * (currentPageSet+1) -4);
        }
    };
    const handleCurrentClick = (current) => {
        setCurrentPage(current);
    };

    const inputRef = useRef(null);
    const handleKeyword = () => {
        setSearchKeyword('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleSelect = (ranges) => {
        setState([ranges.selection]);
    };

    const handleSearch = (e) => {
        console.log(searchKeyword);
        if (e.key === 'Enter') {
            const filtered = items.filter((item) => {
                return item.title.toUpperCase().includes(searchKeyword.trim().toUpperCase());
            });
            setSearchResult(filtered);
        }
    }

    useEffect(() => {
        const apiUrl = 'http://localhost:8080/';

        const requestData = {
            page: currentPage
        }
        console.log(requestData);

        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestData),
        }
        /*fetch(apiUrl, request)
            .then((response) => {
                if (response.ok){
                    return response.json();
                } else {
                    throw new Error(response.errorMessage);
                }
            })
            .then((data) => {
                items = data;
            })
            .catch((error) => {
                console.log(error.errorMessage);
                alert('페이지 로딩 중 오류가 발생했습니다.');
            });*/
    }, [currentPage]);

    const renderPage = () => {
        switch (currentRenderPage) {
            case 'listView':
                return (
                    <>
                        <div className='noticeList_title_container'>
                            <div>
                                <img className='noticeList_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/main');}}/>
                                공지사항
                            </div>
                            <img className='noticeList_search_icon' src={search} alt='검색' onClick={() => setCurrentRenderPage('search')}/>
                        </div>
                        <div className='noticeList_range'>
                            <img className='noticeList_range_icon' src={calendar} alt="달력" onClick={() => setShowRangePicker(true)}/>
                            <Modal
                                isOpen={showRangePicker}
                                onRequestClose={()=>setShowRangePicker(false)}
                                style={customModal2}
                                id='rangePickerModal'>
                                <DateRange
                                    ranges={state}
                                    onChange={handleSelect}
                                />
                            </Modal>
                            <p>{state[0].endDate===null
                                ? '전체'
                                : `${moment(state[0].startDate).format('YYYY.MM.DD')} ~ ${moment(state[0].endDate).format('YYYY.MM.DD')}`
                            }</p>
                        </div>
                        <div className='noticeList_table_container'>
                            <TableView
                                tableFor='noticeList'
                                items = {items}
                            />
                        </div>
                        <div className='paging_container'> {/*TODO: 페이지 바뀔 때마다 데이터 불러오기*/}
                            <ul className='pagination_modal'>
                                <li><Link to={`/notice/list?page=${currentPageSet === 1 ? 1 : 5*(currentPageSet-1)}`}><img className='previous' src={arrow_left} alt='이전 페이지' onClick={() => handlePreviousClick()}/></Link></li>
                                <li className="pageNum"><Link to={`/notice/list?page=${5*currentPageSet-4}`} className={currentPage === 5*currentPageSet-4 ? 'active' : ""} onClick={() => handleCurrentClick(5*currentPageSet-4)}>{5*currentPageSet-4}</Link></li>
                                <li className="pageNum"><Link to={`/notice/list?page=${5*currentPageSet-3}`} className={currentPage === 5*currentPageSet-3 ? 'active' : ""} onClick={() => handleCurrentClick(5*currentPageSet-3)}>{5*currentPageSet-3}</Link></li>
                                <li className="pageNum"><Link to={`/notice/list?page=${5*currentPageSet-2}`} className={currentPage === 5*currentPageSet-2 ? 'active' : ""} onClick={() => handleCurrentClick(5*currentPageSet-2)}>{5*currentPageSet-2}</Link></li>
                                <li className="pageNum"><Link to={`/notice/list?page=${5*currentPageSet-1}`} className={currentPage === 5*currentPageSet-1 ? 'active' : ""} onClick={() => handleCurrentClick(5*currentPageSet-1)}>{5*currentPageSet-1}</Link></li>
                                <li className="pageNum"><Link to={`/notice/list?page=${5*currentPageSet}`} className={currentPage === 5*currentPageSet ? 'active' : ""} onClick={() => handleCurrentClick(5*currentPageSet)}>{5*currentPageSet}</Link></li>
                                <li><Link to={`/notice/list?page=${currentPageSet === limitPageSet ? limitPageSet : 5*(currentPageSet+1)-4}`}><img className='next' src={arrow_right} alt='다음 페이지' onClick={() => handleNextClick()}/></Link></li>
                            </ul>
                        </div>
                    </>
                );
            case 'search':
                return (
                    <>
                        <div className='noticeList_searchBar_container'>
                            <img className='noticeList_searchBar_icon' src={arrow_left} alt="뒤로 가기" onClick={()=> {setCurrentRenderPage('listView'); setSearchKeyword('');}}/>
                            <div>
                                <input type='text' className='noticeList_searchBar_field' value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} onKeyDown={handleSearch} ref={inputRef}/>
                                <img className='noticeList_search_icon' id={searchKeyword==='' ? 'notExist1' : 'exist1'} src={search} alt='검색' onClick={() => setCurrentRenderPage('search')}/>
                                <button type='button' className='delete_btn' id={searchKeyword==='' ? 'notExist2' : 'exist2'} onClick={handleKeyword}>✕</button>
                            </div>
                        </div>
                        <div className='search_result_container'>
                            <TableView
                                tableFor='search'
                                items={searchResult}
                                keyword={searchKeyword}
                            />
                        </div>
                    </>
                );
        }
    };

    return (
        <>
            {renderPage()}
        </>
    );
}

export default NoticeList;