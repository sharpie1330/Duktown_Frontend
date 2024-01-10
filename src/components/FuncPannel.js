import React, {useContext, useEffect, useRef, useState} from "react";
import '../css/FuncPannel.css';

function FuncPannel({userNumber, type}) {
    const renderPannel = () => {
        if (type === 'title') {
            if (userNumber === 0) {
                return (
                    <div className='funcPannel_container1'>
                        <div className='funcPannel_recruit_fin'>
                            모집 종료
                        </div>
                        <div className='funcPannel_account_modify'>
                            송금 계좌 수정
                        </div>
                        <div className='funcPannel_order_fin'>
                            주문 완료
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className='funcPannel_container1'>
                        <div className='funcPannel_delivery_post'>
                            게시글 보기
                        </div>
                        <div className='funcPannel_go_out'>
                            채팅방 나가기
                        </div>
                    </div>
                );
            }
        } else if (type === 'chat') {
            if (userNumber === 0) {
                return (
                    <div className='funcPannel_container2'>
                        <div className='funcPannel_kick'>
                            내보내기
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className='funcPannel_container2'>
                        <div className='funcPannel_report'>
                            신고하기
                        </div>
                    </div>
                );
            }
        }
    }
    return (
        <>
            {renderPannel()}
        </>
    )
}

export default FuncPannel;