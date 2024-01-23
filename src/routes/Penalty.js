import React, {useState} from "react";
import arrow_left from "../assets/arrow_left.png";
import '../css/Penalty.css';

function Penalty(){
    const [tab, setTab] = useState(1);
    const renderTable = () => {
        switch (tab) {
            case 1:
                return (
                    <table className='penalty_tab_content_table'>
                        <tbody>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>사용 제한 전기제품 사용 사실을 알고도 신고하지 않았을 경우</td>
                                <td>유니트(UNIT)원 전체에 부과</td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>조장이 청소검사표를 작성/부착하지 않은 경우</td>
                                <td>조장에게 부과</td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>냉장고 청소(월 1회)를 하지 않은 경우</td>
                                <td>유니트(UNIT)원 전체에 부과</td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>기숙사 공동물품(다리미, 빨래건조대 등)을 개인적으로 가져가 사용한 경우</td>
                                <td></td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>대여물 반납일로부터 7일(휴일 제외) 이상 연체한 경우, 카트 이용 후 미반납하는 경우도 해당</td>
                                <td>연체날짜 연장 시 벌점 누계됨</td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>소방법을 위반한 경우(복도에 물건 비치, 방화문 열린 상태 고정 등)</td>
                                <td>유니트(UNIT)원 전체에 부과 가능</td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>방 열쇠(카드키)를 분실한 경우(재발급비 1만원 배상)</td>
                                <td/>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>기한 내 학생카드 입력을 하지 않은 경우</td>
                                <td>연체날짜 연장 시 벌점 누계됨</td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>행정에 필요한 서류(퇴사원서, 자가체온측정표 등)를 기한 내 미제출</td>
                                <td>연체날짜 연장 시 벌점 누계됨</td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>OT, 화재대피훈련, 호실 점검에 지각한 경우</td>
                                <td/>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>유니트 조장(가온1관,국제기숙사 해당)이 매주 월요일에 사무실에서 쓰레기봉투를 수령하지 않은 경우</td>
                                <td>조장에게 부과</td>
                            </tr>
                            <tr>
                                <td className='penalty_tab_content_table_col1'>스페어키(가온Ⅰ관) 30분 / 마스터키(가온Ⅱ관, 국제기숙사) 10분 초과하여 반납할 경우</td>
                                <td/>
                            </tr>
                        </tbody>
                    </table>
                );
            case 2:
                return (
                    <table className='penalty_tab_content_table'>
                        <tbody>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>외부인 출입시간을 지키지 않은 경우</td>
                                <td/>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>정규 입퇴사 시 정해진 시간 내에 입사를 하지 않은 경우</td>
                                <td/>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>OT에 불참한 경우</td>
                                <td>수업 등으로 인한 불참 제외(확인서 제출)</td>
                            </tr>
                            <tr>
                                <td className='penalty_tab_content_table_col1'>스페어키(가온Ⅰ관) / 마스터키(가온Ⅱ관, 국제기숙사)를 월 5회 이상 대여</td>
                                <td/>
                            </tr>
                        </tbody>
                    </table>
                );
            case 3:
                return (
                    <table className='penalty_tab_content_table'>
                        <tbody>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>호실 점검에 불참할 경우</td>
                                <td>오리엔테이션 등 행사 시</td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>청소당번이 청소를 하지 않은 경우</td>
                                <td>조장에게 부과</td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>청소벌점을 교환한 경우</td>
                                <td>벌점을 교환한 양측에 모두 부과</td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>외박신청을 하지 않고 귀사하지 않은 경우(무단외박)</td>
                                <td/>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>외박신청 여부와 상관없이 새벽 1시~새벽 5시 사이에 출입한 경우</td>
                                <td>연체날짜 연장 시 벌점 누계됨</td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>안전/건강/공동생활 관련 지시 및 권고사항에 대한 미이행</td>
                                <td>유니트(UNIT)원 전체에 부과 가능</td>
                            </tr>
                            <tr>
                                <td className='penalty_tab_content_table_col1'>기숙사 물품을 기숙사가 아닌 곳에 반출할 경우</td>
                                <td>랜선 포함</td>
                            </tr>
                        </tbody>
                    </table>
                );
            case 4:
                return (
                    <table className='penalty_tab_content_table'>
                        <tbody>
                            <tr>
                                <td className='penalty_tab_content_table_col1'>화재대피훈련에 불참할 경우</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                );
            case 8:
                return (
                    <table className='penalty_tab_content_table'>
                        <tbody>
                            <tr>
                                <td className='penalty_tab_content_table_col1'>사용 제한 전기제품 사용 사실을 알고도 신고하지 않았을 경우</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                );
            case 10:
                return (
                    <table className='penalty_tab_content_table'>
                        <tbody>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>남자 외부인을 정해진 기간 외에 무단으로 출입시키는 경우</td>
                                <td></td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>기숙사 내에서 음주(주류 반입 포함)</td>
                                <td></td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>흡연구역이 아닌 곳에서 흡연을 하는 경우</td>
                                <td>건물 옥상 역시 금연 구역</td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>음주 후 귀사하여 난동을 부리는 등 타 사생에게 피해를 끼치는 경우</td>
                                <td/>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>화장실 변기 및 세면대에 음식물 및 각종 이물질 버린 경우</td>
                                <td></td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>수도를 틀고 외출하는 등 수해를 일으키는 경우</td>
                                <td></td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>임의로 자리를 변경하는 경우</td>
                                <td>2인실에 해당</td>
                            </tr>
                            <tr>
                                <td className='penalty_tab_content_table_col1'>기숙사 및 직원에 대한 폭언 및 비방/인격 모독을 한 경우</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                );
            case 16:
                return (
                    <table className='penalty_tab_content_table'>
                        <tbody>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>공동생활과 면학 분위기를 해치는 행위</td>
                                <td>도박, 폭음, 집단소란 행위 등</td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>임의로 방(호실)을 바꾸는 행위</td>
                                <td></td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>사내 동물사육 행위</td>
                                <td></td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>기타 사칙 고의 위반 행위</td>
                                <td/>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>외박일수를 모두 합한 날짜가 16일을 초과할 경우</td>
                                <td>한 학기 기준(방학도 동일)</td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>다른 학생의 신상을 대용하여 입사한 경우</td>
                                <td>양측 모두 다음 학기 입사 불가</td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>사용제한 전기제품(전기장판, 전기방석, 전기난로, 에어프라이어, 라면포트 등의 전열기구 및 냉장고)을 소지한 경우</td>
                                <td>가온Ⅰ관은 냉장고(50ℓ이하)사용가능</td>
                            </tr>
                            <tr>
                                <td className='penalty_tab_content_table_col1'>다리미, 쿡탑, 전자레인지 등을 켜놓은 채 자리를 비워 위험이 초래된 경우(ex.화재경보기 작동)</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                );
            case 25:
                return (
                    <table className='penalty_tab_content_table'>
                        <tbody>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>무단 퇴사한 경우</td>
                                <td>즉시퇴사/향후입사불가</td>
                            </tr>
                            <tr className='penalty_tab_content_table_tr'>
                                <td className='penalty_tab_content_table_col1'>외부인 숙박 시도 및 외부인을 숨기는 경우</td>
                                <td>즉시퇴사/향후입사불가</td>
                            </tr>
                            <tr>
                                <td className='penalty_tab_content_table_col1'>도난 행위</td>
                                <td> 즉시퇴사/향후입사불가/방을 임의대로 불시 점검 할 수 있음(부재 시에도 유효함)</td>
                            </tr>
                        </tbody>
                    </table>
                );
        }
    }

    return(
        <>
            <div className='penalty_title_container'>
                <img className='penalty_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{window.history.back();}}/>
                벌점 기준표
            </div>
            <div className='penalty_body_container'>
                <div className='penalty_tab_container'>
                    <div className={tab === 1 ? 'active' : 'nonActive'} onClick={() => setTab(1)}>
                        1점
                    </div>
                    <div className={tab === 2 ? 'active' : 'nonActive'} onClick={() => setTab(2)}>
                        2점
                    </div>
                    <div className={tab === 3 ? 'active' : 'nonActive'} onClick={() => setTab(3)}>
                        3점
                    </div>
                    <div className={tab === 4 ? 'active' : 'nonActive'} onClick={() => setTab(4)}>
                        4점
                    </div>
                    <div className={tab === 8 ? 'active' : 'nonActive'} onClick={() => setTab(8)}>
                        8점
                    </div>
                    <div className={tab === 10 ? 'active' : 'nonActive'} onClick={() => setTab(10)}>
                        10점
                    </div>
                    <div className={tab === 16 ? 'active' : 'nonActive'} onClick={() => setTab(16)}>
                        16점
                    </div>
                    <div className={tab === 25 ? 'active' : 'nonActive'} onClick={() => setTab(25)}>
                        25점
                    </div>
                </div>
                <div className='penalty_table_container'>
                    {renderTable()}
                </div>
                <div className='penalty_content_container'>
                    <p className='penalty_tab_content_title'>
                        ◾ 벌점 기준
                    </p>
                    <div className='penalty_tab_content_content'>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>학기 중 벌점의 총 합계</span></div>
                        <div className='penalty_tab_content_horizontal'>&nbsp;&nbsp;&nbsp;<span>↳ 13점 이상일 경우 : 방학 및 다음 학기 입사 불가</span></div>
                        <div className='penalty_tab_content_horizontal'>&nbsp;&nbsp;&nbsp; <span>↳ 16점 이상일 경우 : 즉시 퇴사조치와 동시에 방학 및 다음 학기 입사 불가</span></div>
                        <div className='penalty_tab_content_horizontal'>&nbsp;&nbsp;&nbsp; <span>↳ 25점 이상일 경우 : 즉시 퇴사조치와 동시에 향후 입사 불가</span></div>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>방학 중 벌점의 총 합계가 9점 이상일 경우 : 즉시 퇴사조치와 동시에 다음 학기 입사 불가</span></div>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>기숙사 거주 중 다음 기숙사 모집에 합격하였더라도 벌점 합계가 기준 이상일 경우 합격 취소됨</span></div>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>본인의 벌점은 덕성포털에서 확인 가능</span></div>
                    </div>
                    <p className='penalty_tab_content_title'>
                        ◾ 무단외박
                    </p>
                    <div className='penalty_tab_content_content'>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>외박신청서 미작성, 새벽 1시 이후에 들어오지 않은 경우 : 무단외박 벌점(3점) (외박일수 포함)</span></div>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>외박신청서 작성, 새벽 1시 ~ 새벽 5시 사이에 들어온 경우 : 통금어김 벌점(3점) (외박일수 포함)</span></div>
                    </div>
                    <p className='penalty_tab_content_title'>
                        ◾ 외박신청서 작성 안내
                    </p>
                    <div className='penalty_tab_content_content'>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>외박 가능 일수는 학기당 총 16일</span></div>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>
                                     외박신청은 덕성포털에서 외박 당일 22:00 이전까지 신청해야 함<br/>
                                    외박신청을 한 후에는 반드시 외박신청이 잘 되었는지 재확인해야 함<br/>
                                    미확인으로 인한 불이익은 본인 책임, 가급적 컴퓨터를 이용해 신청 바람
                                </span>
                        </div>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>금/토/일, 공휴일에도 외박 신청은 하되 외박 일수 0일로 기입(외박일수 미포함, 장기외박사유서 불필요)</span></div>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>7일(주말, 공휴일 포함) 초과 장기 외박을 할 경우 장기외박 사유서를 기숙사 홈페이지 자료실에서 다운받은 후 반드시 작성해서 사무실에 제출</span></div>
                        <div className='penalty_tab_content_horizontal'>&nbsp;&nbsp;※ <span>중간/기말고사 기간 일주일 전부터 외박 신청 없이 외박 가능(학기당 총 6주)</span></div>
                    </div>
                    <p className='penalty_tab_content_title'>
                        ◾ 청소
                    </p>
                    <div className='penalty_tab_content_content'>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>유니트 청소당번이 청소를 안 한 경우 : 벌점 3점 부과</span></div>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>청소 검사표의 ‘O’는 통과</span></div>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>청소벌점 교환 발각 시 : 교환한 두 사람 모두 벌점 3점 부과</span></div>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>청소 검사표를 분실한 경우 : 유니트원 전체에게 벌점 1점 부과</span></div>
                    </div>
                    <p className='penalty_tab_content_title'>
                        ◾ 다리미 , 가스레인지, 가스오븐레인지, 쿡탑 등을 켜놓은 채 자리를 비워 위험이 초래된 경우
                    </p>
                    <div className='penalty_tab_content_content'>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>(예 : 화재 경보기 작동 등) : 벌점 16점/즉시퇴사 및 다음 학기 입사불가</span></div>
                        <div className='penalty_tab_content_horizontal'>※ <span>켜놓은 사람이 확인되지 않을 경우, 유니트원 전체에게 벌점 1점 부과</span></div>
                    </div>
                    <p className='penalty_tab_content_title'>
                        ◾ 퇴사원서
                    </p>
                    <div className='penalty_tab_content_content'>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>퇴사원서는 퇴사 전 사무실에서 발송한 링크 확인 후 양식에 맞게 작성하여 제출</span></div>
                    </div>
                    <p className='penalty_tab_content_title'>
                        ◾ 흡연, 음주
                    </p>
                    <div className='penalty_tab_content_content'>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>흡연구역 외 흡연 및 기숙사 내 음주 행위가 발각되는 경우 : 벌점 10점</span></div>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>흡연이 가능한 장소</span></div>
                        <div className='penalty_tab_content_horizontal'>&nbsp;&nbsp; <span> ↳ 가온Ⅰ관 - 구관과 신관 사이의 외부에 비치된 의자가 있는 공간 (고성방가 자제)</span></div>
                        <div className='penalty_tab_content_horizontal'>&nbsp;&nbsp; <span>↳ 가온Ⅱ관 - 출입문 옆 건물 앞쪽으로 비치된 의자가 있는 공간</span></div>
                        <div className='penalty_tab_content_horizontal'>&nbsp;&nbsp;※ <span>의자 옆 항아리 = 재떨이</span></div>
                        <div className='penalty_tab_content_horizontal'>&#183; <span>건물 옥상 역시 금연 구역. 흡연 발각 시 벌점 10점 부과</span></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Penalty;