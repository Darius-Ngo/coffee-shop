import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useNavigate, Routes } from 'react-router-dom';

import LoginForm from '../modules/auth/Login';
import HomeUser from '../modules/userPage/home';
import HomeAdmin from '../modules/adminPage/home';


function AppRouter() {
    let navigate = useNavigate();
    const [isUser, setUser] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    let authority = localStorage.getItem('authority');
    const {
        auth: {status},
      } = useSelector((state) => state);

    useEffect(() => {
        if (!authority) {
            navigate("/login");
        }
    }, [authority])

    useEffect(() => {
        if (authority) {
            switch (authority) {
                case 'ADMIN':
                    setAdmin(true);
                    setUser(false);
                    navigate("/", { replace: true });
                    break;
                case 'USER':
                    setAdmin(false);
                    setUser(true);
                    navigate("/");
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
                isUser && (
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