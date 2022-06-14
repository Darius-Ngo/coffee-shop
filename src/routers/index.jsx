import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useNavigate, Routes } from 'react-router-dom';

import LoginForm from '../modules/auth/Login';
import HomeUser from '../modules/userPage/home';
import HomeAdmin from '../modules/adminPage/home';

function AppRouter() {
    let navigate = useNavigate();
    const [isAdmin, setAdmin] = useState(false);
    let authority = localStorage.getItem('authority');

    useEffect(() => {
        if (authority) {
            switch (authority) {
                case 'ADMIN':
                    setAdmin(true);
                    // navigate("/", { replace: true });
                    break;
                case 'USER':
                    setAdmin(false);
                    // navigate("/");
                    break;
            }
        }
    }, [authority]);
    return (
        <>
            <Routes>
                <Route path='/Login'
                    element={<LoginForm />}
                />
            </Routes>
            {
                !isAdmin && (
                    <HomeUser />
                )
            }
            {
                isAdmin && (
                    <HomeAdmin />
                )
            }
        </>
    );
}

export default AppRouter;