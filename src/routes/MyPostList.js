import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import arrow_left from "../assets/arrow_left.png";
import ListView from "../components/ListView";
import '../css/MyPostList.css';
import loggedIn from "../utils";
function MyPostList() {
    const navigate = useNavigate();
    const params = useParams();
    const [category, setCategory] = useState('2');
    const [item, setItem] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const serverUrl = process.env.REACT_APP_BASEURL;

    useEffect(() => {
        if(!loggedIn()){
            alert('로그인이 필요합니다');
            navigate('/signin');
        }

        let apiUrl = '';
        if (params.type === 'posts') {
            if (category === '2') {
                apiUrl = serverUrl + '/my/delivery';
            } else if (category === '1') {
                apiUrl = serverUrl + '/my/posts?category=1';
            } else {
                apiUrl = serverUrl + '/my/posts?category=0';
            }
        } else if (params.type === 'comments') {
            if (category === '2') {
                apiUrl = serverUrl + '/my/delivery/commented';
            } else if (category === '1') {
                apiUrl = serverUrl + '/my/posts/commented?category=1';
            } else {
                apiUrl = serverUrl + '/my/posts/commented?category=0';
            }
        }

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
                    return response.json().then(errorData => {
                        if (errorData.errorMessage && (errorData.errorMessage.includes('Token') || errorData.errorMessage === undefined)) {
                            window.open('http://www.duktown.site/signin', '_self');
                        } else {
                            throw new EvalError(errorData.errorMessage);
                        }
                    });
                }
            })
            .then((data) => {
                setItem(data.content);
            })
            .catch((error) => {
                alert(error);
            });
    }, [category, accessToken, params.type]);

    const visibleList = (item) => {
        if (item.length > 0){
            if (category === '2'){
                return <ListView tableFor='myDeliveryPost' items={item}/>
            }
            else {
                return <ListView tableFor='myPost' items={item}/>
            }
        } else {
            return  <span className='myPost_none'>이 카테고리에 쓴 글이 없습니다</span>
        }
    }

    return (
        <>
            <div className='title_container'>
                <div>
                    <img className='myPost_title_icon' src={arrow_left} alt="뒤로 가기" onClick={()=>{navigate('/myPage');}}/>
                    {params.type === 'posts' ? '내가 쓴 글' : '댓글 단 글'}
                </div>
            </div>
            <div className='myPost_category'>
                <select name='category' className='myPost_select' onChange={(e) => setCategory(e.target.value)}>
                    <option value='2'>배달팟</option>
                    <option value='1'>장터</option>
                    <option value='0'>일상</option>
                </select>
            </div>
            <div className='myPost_list_container'>
                {visibleList(item)}
            </div>
        </>
    );
}

export default MyPostList;