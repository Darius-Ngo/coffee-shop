import React from 'react'
import SideBar from '../components/sideBar';
import AdminRouter from '../router';
import './styles.scss';

const HomeAdmin = () => {
    return (
        <div className="container">
            <SideBar />
            <div className="wrap-content admin-page">
                <AdminRouter />
            </div>
        </div>
    )
}

export default HomeAdmin