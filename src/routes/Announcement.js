import React, {useEffect, useRef, useState} from 'react';
import arrow_left from '../assets/arrow_left.png';
import arrow_right from '../assets/arrow_right.png';
import '../css/Announcement.css';
import {Link, useNavigate} from 'react-router-dom';
import ListView from "../components/ListView";
import search from "../assets/search.png";

function Announcement(){
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSet, setCurrentPageSet] = useState(1);
    const [limitPageSet, setLimitPageSet] = useState(5); {/*임시*/}
    const [currentRenderPage, setCurrentRenderPage] = useState('listView');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [keywordList, setKeywordList] = useState(JSON.parse(localStorage.getItem('keywords')) || '[]');
    let items = [{id:1, title:'[기숙사] 12월 24일 방송 내용', date:'2023.12.24'}, {id:2, title:'[기숙사] 12월 13일 방송 내용', date: '2023.12.13'}]

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

    const handleSearch = (e) => {
        console.log(searchKeyword);
        if (e.key === 'Enter') {
            const filtered = items.filter((item) => {
                return item.title.toUpperCase().includes(searchKeyword.trim().toUpperCase());
            });
            setSearchResult(filtered);

            const newKeyword = {
                id: new Date(),
                text: searchKeyword
            }
            setKeywordList([newKeyword, ...keywordList]);
            console.log(keywordList);
        }
    }

    useEffect(() => {
        localStorage.setItem('keywords', JSON.stringify(searchKeyword));
    }, [searchKeyword])

    const renderPage = () => {
        switch (currentRenderPage) {
            case 'listView':
                return (
                    <>
                        <div className='title_container'>
                            <div>
                                <img className='announcement_icon' src={arrow_left} alt="뒤로가기" onClick={()=>{navigate('/home');}}></img>
                                점호 방송
                            </div>
                            <img className='announcement_search_icon' src={search} alt='검색' onClick={() => setCurrentRenderPage('search')}/>
                        </div>
                        <div className='content_container'>
                            <div className='announcement_history_container'>
                                <form action='#'>
                                    <select name='dorm' className='dorm_select'>
                                        <option value='가온1관'>가온1관</option>
                                        <option value='가온2관'>가온2관</option>
                                        <option value='국제관'>국제관</option>
                                    </select>
                                </form>
                                <div className='announcement_table_container'>
                                    <ListView
                                        tableFor='noticeList'
                                        items={items}
                                    />
                                </div>
                            </div>
                            <div className='announcement_paging_container'> {/*TODO: 페이지 바뀔 때마다 데이터 불러오기*/}
                                <ul className='announcement_pagination_modal'>
                                    <li><Link to={`/announcement/historys?page=${currentPageSet === 1 ? 1 : 5*(currentPageSet-1)}`}><img className='previous' src={arrow_left} alt='이전 페이지' onClick={() => handlePreviousClick()}/></Link></li>
                                    <li className="pageNum"><Link to={`/announcement/historys?page=${5*currentPageSet-4}`} className={currentPage === 5*currentPageSet-4 ? 'active' : ""} onClick={() => handleCurrentClick(5*currentPageSet-4)}>{5*currentPageSet-4}</Link></li>
                                    <li className="pageNum"><Link to={`/announcement/historys?page=${5*currentPageSet-3}`} className={currentPage === 5*currentPageSet-3 ? 'active' : ""} onClick={() => handleCurrentClick(5*currentPageSet-3)}>{5*currentPageSet-3}</Link></li>
                                    <li className="pageNum"><Link to={`/announcement/historys?page=${5*currentPageSet-2}`} className={currentPage === 5*currentPageSet-2 ? 'active' : ""} onClick={() => handleCurrentClick(5*currentPageSet-2)}>{5*currentPageSet-2}</Link></li>
                                    <li className="pageNum"><Link to={`/announcement/historys?page=${5*currentPageSet-1}`} className={currentPage === 5*currentPageSet-1 ? 'active' : ""} onClick={() => handleCurrentClick(5*currentPageSet-1)}>{5*currentPageSet-1}</Link></li>
                                    <li className="pageNum"><Link to={`/announcement/historys?page=${5*currentPageSet}`} className={currentPage === 5*currentPageSet ? 'active' : ""} onClick={() => handleCurrentClick(5*currentPageSet)}>{5*currentPageSet}</Link></li>
                                    <li><Link to={`/announcement/historys?page=${currentPageSet === limitPageSet ? limitPageSet : 5*(currentPageSet+1)-4}`}><img className='next' src={arrow_right} alt='다음 페이지' onClick={() => handleNextClick()}/></Link></li>
                                </ul>
                            </div>
                        </div>
                    </>
                )
            case 'search':
                return (
                    <>
                        <div className='announcement_searchBar_container'>
                            <img className='announcement_searchBar_icon' src={arrow_left} alt="뒤로 가기" onClick={()=> {setCurrentRenderPage('listView'); setSearchKeyword('');}}/>
                            <div>
                                <input type='text' className='announcement_searchBar_field' value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} onKeyDown={handleSearch} ref={inputRef}/>
                                <img className='announcement_search_icon' id={searchKeyword==='' ? 'notExist1' : 'exist1'} src={search} alt='검색' onClick={() => setCurrentRenderPage('search')}/>
                                <button type='button' className='delete_btn' id={searchKeyword==='' ? 'notExist2' : 'exist2'} onClick={handleKeyword}>✕</button>
                            </div>
                        </div>
                        <div className='search_result_container'>
                            <ListView
                                tableFor='search'
                                items={searchResult}
                                keyword={searchKeyword}
                            />
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

export default Announcement;
