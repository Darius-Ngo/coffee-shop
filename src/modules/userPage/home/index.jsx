import React from 'react';
import {useLocation} from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import UserRouter from '../router';

const HomeUser = () => {
    const location = useLocation();
    return (
        <div className="container"> 
            {
                location.pathname !== "/login" && (
                  <Header />
                )
            }
            <UserRouter/>
            <Footer/>
        </div>
    )
}

export default HomeUser