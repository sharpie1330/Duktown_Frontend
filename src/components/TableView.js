import React from 'react';
import {Link} from "react-router-dom";
import '../css/TableView.css';
function TableView({ items, tableFor, keyword }) {
    let table = [];
    switch (tableFor) {
        case 'repair':
            const repairTableArr = items.map(item => {
                let rows = [];
                const createCols = () => {
                    let cols = [];
                    cols.push(<td className='dateCol'>{item.date}</td>);
                    cols.push(<td className='contentCol'>{item.content}</td>);
                    cols.push(<td className='confirmCol'>{item.confirm}</td>);
                    cols.push(<td className='statusCol'>{item.status}</td>);
                    return cols;
                }
                rows.push(<tr className='tableRow'>{createCols()}</tr>);
                return rows;
            })
            table = repairTableArr;
            break;
        case 'stayout':
            const stayOutTableArr = items.map(item => {
                let rows = [];
                const createCols = () => {
                    let cols = [];
                    cols.push(<td className='requestDateCol'>{item.requestDate}</td>);
                    cols.push(<td className='rangeCol'>총 <p className='range_highlight'>{item.range}</p> 일 외박</td>);
                    return cols;
                }
                rows.push(<tr className='tableRow'>{createCols()}</tr>);
                rows.push(<tr className='startDateRow'>{`외박 시작 날짜 ${item.startDate}`}</tr>);
                rows.push(<tr className='endDateRow'>{`돌아오는 날짜 ${item.endDate}`}</tr>);
                rows.push(<tr className='addressRow'>{`${item.address} ${item.specAddress}`}</tr>);
                rows.push(<tr className='space'/>);
                return rows;
            })
            table = stayOutTableArr;
            table.push(<tr className='space2'/>);
            break;
        case 'repairHistory':
            const repairHistoryTableArr = items.map(item => {
                let rows = [];
                const createCols = () => {
                    let cols = [];
                    cols.push(<td className='contentCol'><Link to={`/repairs/historys/detail/${item.id}`}>{item.content}</Link></td>);
                    cols.push(<td className='confirmCol' rowSpan={2}><div className={item.confirm === '확인' ? 'confirm' : 'unconfirmed'}>{item.confirm}</div></td>);
                    cols.push(<td className='statusCol' rowSpan={2}><div className={item.status === '해결' ? 'solve' : 'unresolved'}>{item.status}</div></td>);
                    return cols;
                }
                rows.push(<tr className='tableRow'>{createCols()}</tr>);
                rows.push(<tr className='dateRow' >{item.date}</tr>);
                rows.push(<tr className='space'/>);
                return rows;
            })
            table = repairHistoryTableArr;
            break;
        case 'noticeList':
            const noticeListTableArr = items.map(item => {
                const today = new Date();
                const itemDate = new Date(item.date);
                const isNew = (itemDate.getFullYear()===today.getFullYear())&&(itemDate.getMonth()===today.getMonth())&&(itemDate.getDate()===today.getDate());
                let rows = [];
                const createCols = () => {
                    let cols = [];
                    cols.push(
                        <td className='titleCol'>
                            <div className='titleCol_abbr_container'><abbr className={isNew ? 'new' : 'old'}>N</abbr></div>
                            <Link className={isNew ? 'newA' : 'oldA'} to={`/notice/list/detail/${item.id}`}>{item.title}</Link>
                        </td>
                    );
                    return cols;
                }
                rows.push(<tr className='tableRow1'>{createCols()}</tr>);
                rows.push(<tr className='tableRow2'><td colSpan={2}> {item.date}</td></tr>);
                rows.push(<tr className='space'/>);
                return rows;
            })
            table = noticeListTableArr;
            break;
        case 'search':
            const searchTableArr = items.map(item => {
                //텍스트 하이라이팅
                const textSplit = item.title ? item.title.split(new RegExp(`(${keyword})`, 'gi')) : [];
                console.log(keyword.toUpperCase());

                let rows = [];
                const kewordHighlight = textSplit.map(text =>
                    text.toUpperCase() === keyword.toUpperCase()
                    ? (<span className='keyword'>{text}</span>)
                    : (<span>{text}</span>)
                );
                rows.push(<tr className='titleRow'><td>{kewordHighlight}</td></tr>);
                rows.push(<tr className='dateRow'>{item.date}</tr>);
                rows.push(<tr className='space'/>)
                return rows;
            })
            table = searchTableArr;
            break;
    }

    return (
        <table className={tableFor}>
            {table}
        </table>
    );
}

export default TableView