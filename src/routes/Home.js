import React from 'react';
import Navbar from '../components/Navbar.js';
import Bottombar from '../components/Bottombar.js';

function Home(){
    return (
        <>
            <Navbar />
            <div className='content-container'>
                Home
            </div>
            <Bottombar />
        </> 
    );
}

export default Home;
