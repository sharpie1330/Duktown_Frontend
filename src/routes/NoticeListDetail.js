import React, {useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import AccessTokenContext from "../AccessTokenContext";
import arrow_left from "../assets/arrow_left.png";
import '../css/NoticeListDetail.css';

function NoticeListDetail() {
    const navigate = useNavigate();
    const { accessToken } = useContext(AccessTokenContext);
    let { id } = useParams();
    {/*임시데이터*/}
    let title = '2023학년도 겨울방학 기숙사생 모집';
    let requestDate = '2023.12.13.';
    let content = '2023학년도 겨울방학(겨울계절학기 포함) 기숙사생 모집 안내문을 아래의 첨부파일로 안내드립니다. 안내문을 꼼꼼히 읽어보시고 숙지해 주시기를 부탁드리며 신청 시 제출하는 하단에 첨부된 서류 양식은 임의로 편집하지 말아주시기 바랍니다.';

    /*useEffect(() => {
        const apiUrl = `http://localhost:8080/{}/${id}`;
        const requestData = {
            "id": id
        }

        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestData),
        }

        fetch(apiUrl, request)
            .then((request) => {
                if (request.ok)
                    return request.json();
                else
                    throw new Error(request.errorMessage);
            })
            .then((data) => {
                title = `${data.hallName} ${data.room} ${name}`;
                requestDate = data.date;
                content = data.content;
                confirmStatus = data.confirm;
                confirmDate = data.confirmDate;
                resolutionStatus = data.resolution;
                resolutionDate = data.resolutionDate;
            })
            .catch((error) => {
                console.log(error.errorMessage);
                alert('페이지를 로드하던 중 문제가 발생했습니다.');
            })
    }, []);*/
    return (
        <>
            <div className='noticeListDetail_title_container'>
                <img className='noticeListDetail_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/notice/list?page=1');}}/>
                공지사항
            </div>
            <div className='noticeListDetail_content_container'>
                <p className='content_title'>{title}</p>
                <p className='request_date'>{requestDate}</p>
                <p className='content'>{content}</p>
                <hr/>
                <div className='noticeListDetail_file_container'>
                    <p className='fileNum'>첨부파일 1</p>
                    <p className='file'>어쩌고저쩌고 파일 1</p>
                </div>
            </div>
        </>
    );
}

export default NoticeListDetail;