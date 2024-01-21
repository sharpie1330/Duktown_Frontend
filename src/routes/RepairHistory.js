import React, {useState, useEffect, useContext} from "react";
import { useNavigate, Link } from 'react-router-dom';
import arrow_left from "../assets/arrow_left.png";
import arrow_right from "../assets/arrow_right.png";
import edit_blue from "../assets/edit_blue.png";
import ListView from "../components/ListView";
import '../css/RepairHistory.css';
import AccessTokenContext from "../AccessTokenContext";

function RepairHistory() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSet, setCurrentPageSet] = useState(1);
    const [items, setItems] = useState([]);
    const [limitPageSet, setLimitPageSet] = useState(null);
    const { accessToken } = useContext(AccessTokenContext);
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

    useEffect(() => {
        const apiUrl = `http://localhost:8080/repairApply?pageNo=${currentPage}`;

        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        }
        fetch(apiUrl, request)
            .then((response) => {
                if (response.ok){
                    return response.json();
                } else {
                    throw new Error(response.errorMessage);
                }
            })
            .then((data) => {
                console.log(data);
                setLimitPageSet(data.totalPage);
                setItems(data.content);
            })
            .catch((error) => {
                console.log(error.errorMessage);
                alert('페이지 로딩 중 오류가 발생했습니다.');
            });
    }, [currentPage]);

    return (
        <>
            <div className='repairHistory_title_container'>
                <div className='repairHistory_title'>
                    <img className='repairHistory_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/home');}}/>
                    수리 요청 내역
                </div>
                <img className='repairHistory_title_img' src={edit_blue} alt="수리신청 작성" onClick={()=> {navigate('/repairs/apply');}}/>
            </div>
            <div className='repairHistory_table_container'>
                { items.length > 0
                    ? <ListView tableFor='repairHistory' items = {items}/>
                    : <div className='item_none_notify'>수리 요청 내역이 없습니다.</div> }
            </div>
            <div className='paging_container'>
                <ul className='pagination_modal'>
                    <li><Link to={`/repairs/historys?page=${currentPageSet === 1 ? 1 : 5*(currentPageSet-1)}`}><img className='previous' src={arrow_left} alt='이전 페이지' onClick={() => handlePreviousClick()}/></Link></li>
                    <li className="pageNum"><Link to={`/repairs/historys?page=${5*currentPageSet-4}`} className={currentPage === 5*currentPageSet-4 ? 'active' : ""} onClick={() => handleCurrentClick(5*currentPageSet-4)}>{5*currentPageSet-4}</Link></li>
                    <li className="pageNum"><Link to={`/repairs/historys?page=${5*currentPageSet-3}`} className={currentPage === 5*currentPageSet-3 ? 'active' : ""} onClick={() => handleCurrentClick(5*currentPageSet-3)}>{5*currentPageSet-3}</Link></li>
                    <li className="pageNum"><Link to={`/repairs/historys?page=${5*currentPageSet-2}`} className={currentPage === 5*currentPageSet-2 ? 'active' : ""} onClick={() => handleCurrentClick(5*currentPageSet-2)}>{5*currentPageSet-2}</Link></li>
                    <li className="pageNum"><Link to={`/repairs/historys?page=${5*currentPageSet-1}`} className={currentPage === 5*currentPageSet-1 ? 'active' : ""} onClick={() => handleCurrentClick(5*currentPageSet-1)}>{5*currentPageSet-1}</Link></li>
                    <li className="pageNum"><Link to={`/repairs/historys?page=${5*currentPageSet}`} className={currentPage === 5*currentPageSet ? 'active' : ""} onClick={() => handleCurrentClick(5*currentPageSet)}>{5*currentPageSet}</Link></li>
                    <li><Link to={`/repairs/historys?page=${currentPageSet === limitPageSet ? limitPageSet : 5*(currentPageSet+1)-4}`}><img className='next' src={arrow_right} alt='다음 페이지' onClick={() => handleNextClick()}/></Link></li>
                </ul>
            </div>
        </>
    )
}

export default RepairHistory;