import React, {useContext, useRef, useState} from "react";
import '../css/FuncPannel.css';
import AccessTokenContext from "../AccessTokenContext";
import {useNavigate} from "react-router-dom";
import {useSpring, animated} from "react-spring";
import Button from "./Button";

function FuncPannel({userId, userNumber, type, deliveryId, chatRoomId, accountChange, pannelHandler}) {
    const navigate = useNavigate();
    const { accessToken } = useContext(AccessTokenContext);
    const [isVisible, setIsVisible] = useState(false);
    const [bank,  setBank] = useState('');
    const [account, setAccount] = useState('');
    const [isComposing, setIsComposing] = useState(false);
    const accountInputRef = useRef();
    const serverUrl = 'http://localhost:8080';

    const AnimatedDiv = animated.div;
    const props = useSpring({
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(74vh)' : 'translateY(100vh)',
        width: '94vw',
        position: 'absolute',
        background: '#FFFFFF',
        right: '11px'
    });
    const handleFunc = async (func) => {
        let apiUrl = '';
        switch (func) {
            case 'recruit_fin':
                apiUrl = serverUrl + `/delivery/${deliveryId}/close`;
                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });

                    if (response.ok) {
                        alert('모집 완료 처리되었습니다.');
                        pannelHandler('chatRoomFunc');
                        return;
                    } else {
                        return await response.json().then(errorResponse => {
                            console.log(errorResponse);
                            throw new EvalError(errorResponse.errorMessage);
                        });
                    }
                } catch (error) {
                    alert(error);
                }
                return;
            case 'account_modify':
                const replaceHypen = account.replace(/-/g, '');
                const newAccount = `${bank} ${replaceHypen}`;
                console.log(newAccount);
                apiUrl = serverUrl + `/delivery/${deliveryId}/update`;
                try {
                    const response = await fetch(apiUrl, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify({
                            "accountNumber": newAccount,
                        })
                    });

                    if (response.ok) {
                        alert('계좌 정보가 정상적으로 변경되었습니다.');
                        accountChange(newAccount);
                        pannelHandler('chatRoomFunc');
                        return;
                    } else {
                        return await response.json().then(errorResponse => {
                            console.log(errorResponse);
                            throw new EvalError(errorResponse.errorMessage);
                        });
                    }
                } catch (error) {
                    alert(error);
                }
                return;
            case 'order_fin':
                apiUrl = serverUrl + `/delivery/${deliveryId}/complete`;
                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });

                    if (response.ok) {
                        alert('주문 완료 처리되었습니다.');
                        pannelHandler('chatRoomFunc');
                        return;
                    } else {
                        return await response.json().then(errorResponse => {
                            console.log(errorResponse);
                            throw new EvalError(errorResponse.errorMessage);
                        });
                    }
                } catch (error) {
                    alert(error);
                }
                return;
            case 'go_out':
                apiUrl = serverUrl + `/chatRoom/${chatRoomId}`;
                try {
                    const response = await fetch(apiUrl, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });

                    if (response.ok) {
                        return;
                    } else {
                        return await response.json().then(errorResponse => {
                            console.log(errorResponse);
                            throw new EvalError(errorResponse.errorMessage);
                        });
                    }
                } catch (error) {
                    alert(error);
                }
                return;
            case 'kick':
                apiUrl = serverUrl + `/chatRoomUser/block`
                try {
                    const response = await fetch(apiUrl, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify({
                            "blockUserId": userId,
                            "chatRoomId": chatRoomId,
                        })
                    });

                    if (response.ok) {
                        pannelHandler('chatFunc');
                        return;
                    } else {
                        return await response.json().then(errorResponse => {
                            console.log(errorResponse);
                            throw new EvalError(errorResponse.errorMessage);
                        });
                    }
                } catch (err) {
                    alert(err);
                }
        }
    }

    const handleBankChange = (e) => {
        setBank(e.target.value);
    };

    const handleNumChange = (e) => {
        setAccount(e.target.value);
    };

    const handleModifyBtn = async () => {
        await handleFunc('account_modify');
        setIsVisible(false);
        setBank('');
        setAccount('');
    }

    const bankKeyDownHandler = (e) => {
        if (isComposing) return;
        if (e.key === 'Enter') {
            e.preventDefault();
            accountInputRef.current.focus();
        }
    };

    const accountKeyDownHandler = (e) => {
        if (isComposing) return;
        if (e.key === 'Enter') {
            e.preventDefault();
            handleFunc('account_modify');
            setIsVisible(false);
            setBank('');
            setAccount('');
        }
    }

    const renderPannel = () => {
        if (type === 'title') {
            if (userNumber === 0) {
                return (
                    <div className='funcPannel_container1'>
                        <div className='funcPannel_recruit_fin' onClick={() => handleFunc('recruit_fin')}>
                            모집 종료
                        </div>
                        <div className='funcPannel_account_modify' onClick={() => {
                            isVisible ? setIsVisible(false) : setIsVisible(true)
                        }}>
                            송금 계좌 수정
                        </div>
                        <div className='funcPannel_order_fin' onClick={() => handleFunc('order_fin')}>
                            주문 완료
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className='funcPannel_container1'>
                        <div className='funcPannel_delivery_post' onClick={() => navigate(`/delivery/${deliveryId}`)}>
                            게시글 보기
                        </div>
                        <div className='funcPannel_go_out' onClick={() => {handleFunc('go_out'); window.history.back();}}>
                            채팅방 나가기
                        </div>
                    </div>
                );
            }
        } else if (type === 'chat') {
            if (userNumber === 0) {
                return (
                    <div className='funcPannel_container2'>
                        <div className='funcPannel_kick' onClick={() => handleFunc('kick')}>
                            내보내기
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className='funcPannel_container2'>
                        <div className='funcPannel_report' onClick={() => alert('아직 개발 중인 기능입니다.')}>
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
            <AnimatedDiv style={props}>
                <div className='sliding_tab'>
                    <span>송금 받을 계좌를 입력해 주세요.</span>
                    <div className='sliding_horizon_container'>
                        <input type='text' id='bank_name' placeholder='은행' value={bank} onChange={handleBankChange}
                               onCompositionStart={()=>setIsComposing(true)} onCompositionEnd={()=>setIsComposing(false)} onKeyDown={bankKeyDownHandler}/>
                        <input id='number' placeholder='계좌번호' ref={accountInputRef} value={account} onChange={handleNumChange}
                               onCompositionStart={()=>setIsComposing(true)} onCompositionEnd={()=>setIsComposing(false)} onKeyDown={accountKeyDownHandler}/>
                    </div>
                    <div className='sliding_btn_container'>
                        <Button styleClass='blue_rec_btn' label='수정' onClick={handleModifyBtn}/>
                    </div>
                </div>
            </AnimatedDiv>
        </>
    )
}

export default FuncPannel;