import React, {useState} from "react";
import arrow_left from "../assets/arrow_left.png";
import {useNavigate} from "react-router-dom";
import '../css/DormGuide.css';

function DormGuide(){
    const navigate = useNavigate();
    const [tab, setTab] = useState('life');
    const [section, setSection] = useState(0);

    const renderContent = () => {
        if (tab === 'life'){
            return (
                <>
                    <div className='dormGuide_life_section_container'>
                        <div className='dormGuide_life_section_horizontal_container'>
                            <div className='dormGuide_life_sections'>
                                <p onClick={() => setSection(0)} className={section === 0 ? 'activeSection' : null}>
                                    출입문 개방 시간
                                </p>
                                <p onClick={() => setSection(1)} className={section === 1 ? 'activeSection' : null}>
                                    장기 외박
                                </p>
                                <p onClick={() => setSection(2)} className={section === 2 ? 'activeSection' : null}>
                                    냉·난방 시간
                                </p>
                                <p onClick={() => setSection(3)} className={section === 3 ? 'activeSection' : null}>
                                    외부인 출입
                                </p>
                            </div>
                            <div className='dormGuide_life_sections'>
                                <p onClick={() => setSection(4)} className={section === 4 ? 'activeSection' : null}>
                                    유니트 주방 청소
                                </p>
                                <p onClick={() => setSection(5)} className={section === 5 ? 'activeSection' : null}>
                                    시설물 고장
                                </p>
                                <p onClick={() => setSection(6)} className={section === 6 ? 'activeSection' : null}>
                                    쓰레기 처리
                                </p>
                                <p onClick={() => setSection(7)} className={section === 7 ? 'activeSection' : null}>
                                    우편물 및 택배
                                </p>
                            </div>
                            <div className='dormGuide_life_sections'>
                                <p onClick={() => setSection(8)} className={section === 8 ? 'activeSection' : null}>
                                    주방 이용
                                </p>
                                <p onClick={() => setSection(9)} className={section === 9 ? 'activeSection' : null}>
                                    기타
                                </p>
                                <p onClick={() => setSection(10)} className={section === 10 ? 'activeSection' : null}>
                                    내선전화 이용
                                </p>
                                <p onClick={() => setSection(11)} className={section === 11 ? 'activeSection' : null}>
                                    카드키 안내
                                </p>
                            </div>
                        </div>
                        <p className='dormGuide_section_description'>궁금한 키워드를 클릭하면 해당 내용을 보실 수 있어요</p>
                    </div>
                </>
            );
        } else if (tab === 'safety') {
            return (
                <div className= 'dormGuide_safety_section_container'>
                    <div className='dormGuide_safety_section_content_container'>
                        <p className='dormGuide_safety_section_content_title'>
                            ◾ 전기제품 사용 목록
                        </p>
                        <table className='dormGuide_safety_table'>
                            <th className='dormGuide_safety_table_col1'>구분</th>
                            <th className='dormGuide_safety_table_col2'>목록</th>
                            <tr>
                                <td><b>사용허가</b><br/>전기제품</td>
                                <td className='dormGuide_safety_table_td'>컴퓨터, 노트북, 책상 스탠드, 오디오, 가습기, 선풍기, 헤어드라이어, 밥솥</td>
                            </tr>
                            <tr>
                                <td><b>사용제한</b><br/>전기제품</td>
                                <td className='dormGuide_safety_table_td'>냉장고, TV/VTR, 전기프라이팬, 커피포트, 라면포트, 휴대용 가스레인지, 전기장판, 전기방석, 전기난로, 오븐, 토스트기, 에어프라이어 등 화재의 위험이 있는 물품</td>
                            </tr>
                        </table>
                        <div className='dormGuide_section_content_content'>
                            <div className='dormGuide_section_content_horizontal'>※ <span>사용제한 전기제품을 사용하다가 적발될 경우 즉시 집으로 송부하고 기숙사 규정에 따라 벌점 16점 부과 후 즉시퇴사 및 방학 및 다음학기 입사 불가 처리함</span></div>
                            <div className='dormGuide_section_content_horizontal'>※ <span>불시에 사용제한 전기제품이 있는지 점검할 수 있음</span></div>
                            <div className='dormGuide_section_content_horizontal_highlight'>※ <span>가온Ⅰ관은 냉장고(50ℓ이하) 사용 가능</span></div>
                        </div>
                    </div>
                    <div className='dormGuide_safety_section_content_container'>
                        <p className='dormGuide_safety_section_content_title'>
                            ◾ 소방시설법 관련
                        </p>
                        <div className='dormGuide_section_content_content'>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>소화기는 화재 발생을 대비하여 각 층에 비치되어 있고 소화기의 위치는 바꾸지 말아야함</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>화재대피훈련은 학기당 1회(3월, 9월) 실시하며 불참 시 벌점(4점), 지각 시 벌점(1점) 부과</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>소방시설법 의거, 계단을 포함한 복도에 개인 빨래건조대, 우산, 캐리어, 박스 등 개인 물품 보관 금지(가온Ⅰ관의 경우 방화문을 닫힌 상태로 유지해야 함)</span></div>
                        </div>
                    </div>
                    <div className='dormGuide_safety_section_content_container'>
                        <p className='dormGuide_safety_section_content_title'>
                            ◾ 무인경비 시스템(ADT캡스)
                        </p>
                        <div className='dormGuide_section_content_content'>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>새벽 1시 ~ 새벽 5시에 외부 침입 방지를 목적으로 작동되며 가온Ⅰ관 중앙 현관에서만 출입 가능하고 기숙사 내 이동은 지하 통로 이용</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>국제기숙사 출입문은 새벽 1시부터 새벽 5시까지 무인경비시스템(ADT캡스)이 가동되며 가동시간 동안 자동 출입 불가</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>외부인의 무단출입을 방지하고 입사자들의 안전을 도모하기 위해 기숙사 정문, 건물 출입구, 외곽, 건물 내 복도에 CCTV 설치(녹화된 자료는 도난 등 특별한 상황에서 절차에 따라 관리자 입회 하에 조회 가능)</span></div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    const renderChildContent = () => {
        switch (section) {
            case 0:
                return (
                    <div className='dormGuide_section_content_container'>
                        <p className='dormGuide_section_content_title'>
                            ◾ 출입문 개방 시간
                        </p>
                        <div className='dormGuide_section_content_content'>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>기숙사 정문 개방시간 : 새벽 5시 ~ 익일 새벽 1시(개방시간 외에 출입할 경우 무단외박 벌점 3점 부과)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>가온Ⅰ관 - 새벽 1시부터 새벽 5시까지 지문을 사용하여 24시간 출입 가능/ADT캡스 무인경비시스템 작동</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>가온Ⅱ관 - 출입문 카드키 이용 시 24시간 출입 가능/ADT캡스 무인경비시스템 작동</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>국제기숙사 - 새벽 1시부터 새벽 5시까지 건물 현관 자동 출입 불가/ADT캡스 무인경비시스템 작동</span></div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className='dormGuide_section_content_container'>
                        <p className='dormGuide_section_content_title'>
                            ◾ 장기 외박
                        </p>
                        <div className='dormGuide_section_content_content'>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>7일(주말/공휴일 미포함) 초과 장기 외박의 경우 청소검사 일정 조절을 해야 하기 때문에 장기 외박사유서를 기숙사 홈페이지 자료실에서 다운받아 작성 후 증빙 자료와 함께 기숙사 사무실에 필수로 제출해야 함.</span></div>
                            <div className='dormGuide_section_content_horizontal'>※ <span>시험 전 주와 시험기간은 장기외박 사유서를 제출하지 않아도 됨</span></div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className='dormGuide_section_content_container'>
                        <p className='dormGuide_section_content_title'>
                            ◾ 냉·난방 시간
                        </p>
                        <div className='dormGuide_section_content_content'>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>냉방 : 외부 온도에 따라 가동, 각 호실에서 on/off 및 온도 설정</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>난방 : 외부 최저온도가 영상 10℃ 이하일 때 난방시험 가동 후 가동</span></div>
                            <div className='dormGuide_section_content_horizontal'>※ <span>냉/난방 가동 기준 온도 및 시간은 날씨와 상황에 따라 변동될 수 있음</span></div>
                            <div className='dormGuide_section_content_horizontal'>※ <span>단, 가온Ⅰ관은 개별난방이 아닌 중앙난방시스템으로 온도 및 가동시간 등의 설정이 일괄 적용됨</span></div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className='dormGuide_section_content_container'>
                        <p className='dormGuide_section_content_title'>
                            ◾ 외부인 출입(입·퇴사 시에만 가능)
                        </p>
                        <div className='dormGuide_section_content_content'>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>정규 입·퇴사: 부모님, 친구 등 성별 관계없이 건물 출입 가능/차량 출입 가능</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>추가 입사·중도 퇴사: 평일 10시~19시 여성만 건물 출입 가능(미리 사무실에 고지 필수)/차량 출입 가능</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>주말 및 공휴일에는 사무실을 운영하지 않으므로 차량 출입 및 외부인 출입 절대 불가(부득이하게 짐을 옮겨야 하는 경우, 캡스 대원에게 차량용 철문 개방 요청하여 문 밖에 주차한 후 카트 이용</span></div>
                            <div className='dormGuide_section_content_horizontal'>※ <span>입·퇴사 시 출입한 외부인은 짐을 옮길 때 도움을 주는 것만 가능하며 그 외의 모든 행위(식사, 친목 도모 등) 절대 불가</span></div>
                            &nbsp; ▶ 적발 시 ‘공동생활과 면학 분위기를 해치는 행위’ 벌점 10점 부과
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className='dormGuide_section_content_container'>
                        <p className='dormGuide_section_content_title'>
                            ◾ 유니트 주방 청소
                        </p>
                        <div className='dormGuide_section_content_content'>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>학기 : 청소시간 23:30~24:00 (청소검사시간 24:00~24:30)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>방학 : 청소시간 23:30~24:00 (청소검사시간 24:00~24:30)</span></div>
                            <div className='dormGuide_section_content_horizontal'>※ <span> 당일 청소당번이 불이익을 받지 않도록 청소검사 완료시까지 주방사용 자제</span></div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className='dormGuide_section_content_container'>
                        <p className='dormGuide_section_content_title'>
                            ◾ 시설물 고장
                        </p>
                        <div className='dormGuide_section_content_content'>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>기숙사 홈페이지 → 기숙사 생활안내 ‘시설물 고장신고’ 게시판에 수리 요청</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>기숙사 건물명, 호실, 이름, 고장 상태 등을 자세하게 기재해야 함</span></div>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className='dormGuide_section_content_container'>
                        <p className='dormGuide_section_content_title'>
                            ◾ 쓰레기 처리
                        </p>
                        <div className='dormGuide_section_content_content'>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>일반쓰레기</span></div>
                            <div className='dormGuide_section_content_horizontal'>&nbsp;&#183; <span>규격봉투</span></div>
                            <div className='dormGuide_section_content_horizontal'>&nbsp;&#183; <span>일반쓰레기는 주방에 비치된 일반쓰레기 봉투에 넣음 (개인 방에서 나온 쓰레기는 비닐봉투에 담아 묶어서 버릴 것)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>음식물쓰레기</span></div>
                            <div className='dormGuide_section_content_horizontal'>&nbsp;&#183; <span>음식물 쓰레기통</span></div>
                            <div className='dormGuide_section_content_horizontal'>&nbsp;&#183; <span>음식물 쓰레기는 가온Ⅰ관의 경우 각 층에, 가온Ⅱ관의 경우 각 유니트에 비치된 음식물 쓰레기통에 물기를 거른 후 버려야 함 재활용품 각 층 분리수거함 재활용품은 각 유니트에 비치된 분리수거함에 넣음 (음식물이나 내용물을 제거하고 세척 후 분리수거 할 것) 단, 종이상자는 분리수거 바구니 옆에 가지런히 세워놓기 바람</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>재활용품</span></div>
                            <div className='dormGuide_section_content_horizontal'>&nbsp;&#183; <span>각 층 분리수거함</span></div>
                            <div className='dormGuide_section_content_horizontal'>&nbsp;&#183; <span>재활용품은 각 유니트에 비치된 분리수거함에 넣음 (음식물이나 내용물을 제거하고 세척 후 분리수거 할 것) 단, 종이상자는 분리수거 바구니 옆에 가지런히 세워놓기 바람</span></div>
                        </div>
                    </div>
                );
            case 7:
                return (
                    <div className='dormGuide_section_content_container'>
                        <p className='dormGuide_section_content_title'>
                            ◾ 우편물 및 택배
                        </p>
                        <div className='dormGuide_section_content_content'>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>등기우편은 가온Ⅰ관 사무실에서 수령(신분증 지참 필수)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>택배는 가온Ⅰ관 사무실 앞 택배 보관소에서 수령(CCTV 촬영 중)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>택배를 받을 때는 반드시 자신의 방, 호수, 연락처를 정확하게 기재해야 함.</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>택배를 보낼 때는 사무실 옆에 비치된 송장 출력용 PC(CJ택배)를 이용하여 출력 후 박스에 부착한 뒤 택배 발송 장소에 놓아둘 것 (착불만 가능)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>기숙사에서는 택배 보관 장소만을 제공하는 것으로, 분실에 대한 책임은 없다는 점을 유의하여 주시기 바랍니다.</span></div>
                        </div>
                    </div>
                );
            case 8:
                return (
                    <div className='dormGuide_section_content_container'>
                        <p className='dormGuide_section_content_title'>
                            ◾ 주방 이용
                        </p>
                        <p className='dormGuide_section_content_content'>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>기숙사에서는 식사 제공을 해드리지 않는 대신 주방이 마련되어 있습니다.</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>가온Ⅰ관 : 가스(오븐)레인지 사용시간 새벽 5시~밤 11시 30분</span></div>
                            <div className='dormGuide_section_content_horizontal'>&nbsp;&nbsp;※ <span>시험기간 포함 1주일 전부터는 24시간 사용 가능.</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>단, 청소 및 청소검사시간(23:30~24:30/1시간) 동안은 이용 불가</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>가온Ⅱ관/국제기숙사 : 주방 이용은 24시간 가능하나 청소 및 청소검사시간(23:30~24:30/1시간) 동안은 이용 불가</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>모든 비품(전자레인지 유리판, 식탁 유리 등)의 위생관리는 공동으로 하며 도난, 파손의 경우 해당 유니트원 전체가 공동으로 배상 책임</span></div>
                        </p>
                    </div>
                );
            case 9:
                return (
                    <div className='dormGuide_section_content_container'>
                        <p className='dormGuide_section_content_title'>
                            ◾ 기타
                        </p>
                        <div className='dormGuide_section_content_content'>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>시설 훼손 시 해당 입사자가 배상(ex. 전동 킥보드 및 자전거로 인한 스피드게이트 오작동 등)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>가온Ⅱ관/국제기숙사 : 옷장 철제 바구니(호실 당 2개 배정) 분실 시 개당 8,000원 배상</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>열쇠(방 열쇠/카드키, 주방사물함 열쇠, 옷장 열쇠, 이동식서랍장 열쇠 등) 및 일부 방에 비치된 에어컨 리모컨 분실 시 각 벌점 1점 부과 및 재발급비 각 10,000원 배상</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>각 호실 내부 방바닥(장판), 벽, 비치된 가구 및 시설물 손상 시 해당 입사자가 배상(ex.칼질로 인한 책상표면 훼손, 포스터 부착 등으로 인하 벽지 훼손, 의자 파손, 창문 파손, 액체류 엎지름으로 인한 기계 고장 등)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>세탁기, 건조기 사용료 : 1회 1,000원 (카드충전방식)※ 카드충전기 위치 (가온Ⅰ관 : 사무실 앞 정수기 옆 / 가온Ⅱ관 및 국제기숙사 : 지하 세탁실)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>외용약(밴드, 연고 등)은 평일(월~금) 사무실 운영 시간에 가온Ⅰ관 사무실에서 수령 가능</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>이외 내복약은 학생 개별적으로 준비 및 복용</span></div>
                        </div>
                    </div>
                );
            case 10:
                return (
                    <div className='dormGuide_section_content_container'>
                        <p className='dormGuide_section_content_title'>
                            ◾ 내선전화 이용
                        </p>
                        <p className='dormGuide_section_content_content'>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>기숙사 내 발신</span></div>
                            <div className='dormGuide_section_content_horizontal'>&nbsp;&nbsp;&#183; <span>가온Ⅰ관 1*** (ex. 147호 -> 1147)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&nbsp;&nbsp;&#183; <span>가온Ⅱ관 2*** (ex. 106호 -> 2106)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&nbsp;&nbsp;&#183; <span>국제기숙사의 경우 기숙사 내 발신 방법이 상이하므로 안내책자 참고</span></div>
                            <div className='dormGuide_section_content_horizontal'>&nbsp;&nbsp;※ <span>외부로 발신 불가능</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>외부에서 발신 : ARS 번호 (02) 2001-8100 로 연결 후 안내에 따라</span></div>
                            <div className='dormGuide_section_content_horizontal'>&nbsp;&nbsp;&#183; <span>가온Ⅰ관: 숫자 1 + 각 호실 세 자리 (Ex. 124호 → 1124)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&nbsp;&nbsp;&#183; <span>가온Ⅱ관: 숫자 2 + 각 호실 세 자리 (Ex. 124호 → 2124)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&nbsp;&nbsp;&#183; <span>국제기숙사 : 숫자 79 + 각 호실 두 자리 (Ex. 104호 → 7914)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>비상 시 경비실 내선 0번 (2001-8008), 사무실 내선 8000번 으로 연락로 인하 벽지 훼손, 의자 파손, 창문 파손 등)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>기숙사에서는 외부인에게 내선번호 안내하지 않음 (가족에게 미리 본인 호실 내선번호 알려줄 것)</span></div>
                        </p>
                    </div>
                );
            case 11:
                return (
                    <div className='dormGuide_section_content_container'>
                        <p className='dormGuide_section_content_title'>
                            ◾ 카드키 안내
                        </p>
                        <p className='dormGuide_section_content_content'>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>카드키를 꽂으면 호실에 전기가 들어옴 (2인실의 경우, 자신의 자리에 카드키를 꽂을 것 / 1번:위쪽, 2번:아래쪽)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>방문을 닫으면 자동으로 문이 잠기므로 카드키는 항상 소지</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>카드키를 방안에 두고 방문을 닫아 잠겼을 경우 경비실에서 본인 확인 후 마스터키 대여 가능(주말 및 공휴일만 해당, 평일은 9:00~24:00 까지 가온Ⅰ관 사무실 방문하여 본인 확인 후 동행)</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>카드키 분실시 재발급 비용 10,000원은 본인이 부담하며 벌점 1점 부과</span></div>
                            <div className='dormGuide_section_content_horizontal'>&#183; <span>카드키 재발급 후 카드키를 다시 찾게 되어도 환불 및 벌점 삭제 불가</span></div>
                        </p>
                    </div>
                );
        }
    }

    return (
        <>
            <div className='title_container'>
                <div>
                    <img className='dormGuide_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/myPage');}}/>
                    생활 안내 / 안전관리 규정
                </div>
            </div>
            <div className='dormGuide_body_container'>
                <div className='dormGuide_tab_container'>
                    <div className={tab === 'life' ? 'life_tab_active' : 'life_tab'} onClick={() => setTab('life')}>
                        생활 안내
                    </div>
                    <div className={tab === 'safety' ? 'safety_tab_active' : 'safety_tab'} onClick={() => setTab('safety')}>
                        안전관리 안내
                    </div>
                </div>
                <div className='dormGuide_content_container'>
                    {renderContent()}
                </div>
                {tab==='life' ? renderChildContent() : <></>}
            </div>
        </>
    );
}

export default DormGuide;