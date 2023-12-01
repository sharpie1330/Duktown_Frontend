import React, {useContext, useState} from 'react';
import arrow_left from '../assets/arrow_left.png';
import unit_blue from '../assets/unit_blue.png';
import edit_blue from '../assets/edit_blue.png';
import comment from '../assets/comment.png';
import logout from '../assets/logout.png';
import { useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import AccessTokenContext from '../AccessTokenContext';
import customModal from '../customModalConfig';
import Button from "../components/Button";
import '../css/MyPage.css';

function MyPage() {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { accessToken } = useContext(AccessTokenContext);

    return (
        <>
            <div className='myPage_title_container'>
                <img className='myPage_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/main');}}/>
                마이페이지
            </div>
            <div className="myPage_list_container">
                <ul className="myPage_list">
                    <li className="myPage_list_element" onClick={() => navigate('/user/unit')}>
                        <img id='myUnit' className="myPage_icon" src={unit_blue} alt="나의 유닛"/>
                        나의 유닛
                    </li>
                    <li className="myPage_list_element" onClick={() => navigate('/user/posts')}>
                        <img className="myPage_icon" id='myPosts' src={edit_blue} alt="내가 쓴 글"/>
                        내가 쓴 글
                    </li>
                    <li className="myPage_list_element" onClick={() => navigate('/user/comments')}>
                        <img className="myPage_icon" id='myComments' src={comment} alt="댓글 단 글"/>
                        댓글 단 글
                    </li>
                    <li className="myPage_list_element" onClick={() => setModalIsOpen(true)}>
                        <img className="myPage_icon" id='logout' src={logout} alt="로그아웃"/>
                        로그아웃
                    </li>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={()=>setModalIsOpen(false)}
                        style={customModal}>
                        <div className="unit_modal_container">
                            로그아웃 하시겠습니까?
                            <div className="unit_modal_btn_container">
                                    <Button styleClass="modal_btn_no" label="아니오" onClick={()=>setModalIsOpen(false)} />
                                    <Button styleClass="modal_btn_yes" label="예" onClick={() => setModalIsOpen(false)}/> {/*TODO: 로그아웃 API와 연결 */}
                            </div>
                        </div>
                    </Modal>
                </ul>
            </div>
        </>
    )
}

export default MyPage;