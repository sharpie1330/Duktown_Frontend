function loggedIn (){
    const accessToken = localStorage.getItem('accessToken');
    const timeStamp = localStorage.getItem('timeStamp');

    if(accessToken){
        const timeDiff = new Date().getTime() - timeStamp;

        // 토큰 만료(12시간 초과) 여부 확인
        if(timeDiff < 43200000) {
            return true;
        
        }
        // 만료됐을 경우 데이터 초기화
        else { 
            localStorage.clear();
        }
    }

    return false;
}

export default loggedIn;