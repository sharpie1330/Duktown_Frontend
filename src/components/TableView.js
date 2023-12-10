import React from 'react';
import {Link} from "react-router-dom";
import '../css/TableView.css';
function TableView({ items, tableFor }) {
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
                    cols.push(<td className='dateCol'>{item.date}</td>);
                    cols.push(<td className='confirmCol'>{item.confirm}</td>);
                    cols.push(<td className='statusCol'>{item.status}</td>);
                    return cols;
                }
                rows.push(<tr className='tableRow'>{createCols()}</tr>);
                return rows;
            })
            table = stayOutTableArr;
            break;
        case 'repairHistory':
            const repairHistoryTableArr = items.map(item => {
                let rows = [];
                const createCols = () => {
                    let cols = [];
                    cols.push(<td className='dateCol' >{item.date}</td>);
                    cols.push(<td className='contentCol'><Link to={`/repairs/historys/detail/${item.id}`}>{item.content}</Link></td>);
                    cols.push(<td className='confirmCol'>{item.confirm}</td>);
                    cols.push(<td className='statusCol'>{item.status}</td>);
                    return cols;
                }
                rows.push(<tr className='tableRow'>{createCols()}</tr>);
                return rows;
            })
            table = repairHistoryTableArr;
            break;
    }

    return (
        <table className={tableFor}>
            {table}
        </table>
    );
}

export default TableView