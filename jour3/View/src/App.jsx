import { useEffect, useRef, useState } from 'react';
import LandingPage from './component/landingPage.jsx';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from "./component/mainPage.jsx";
import Shop from "./component/shop.jsx";
import AdminPage from "./component/admin.jsx";
import ShopDetail from "./component/shopDetail.jsx";

function App() {
    const [showAdminButton, setShowAdminButton] = useState(false);


    const router = createBrowserRouter([
        { path: '/', element: <LandingPage /> },
        { path: '/main', element: <MainPage /> },
        { path: '/shop', element: <Shop /> },
        { path: '/admin', element: <AdminPage /> },
        { path: '/shopDetail', element: <ShopDetail /> },
    ]);

    const deconnect = () => {
        localStorage.removeItem("id");
        window.location.reload();
    }

    useEffect(() => {
        const handleStorageChange = () => {
            const userId = localStorage.getItem('id');
            if (!userId) {
                setShowAdminButton(false);
                return;
            }

            const jsonDataUser = { userId };

            fetch(`http://localhost:4242/getUser`, {
                method: "POST",
                body: JSON.stringify(jsonDataUser),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((res) => res.json())
                .then((data) => {

                    console.log(data.message[0].admin)

                    if (data.message[0].admin===true) {
                        setShowAdminButton(true);
                    } else {
                        setShowAdminButton(false);
                    }
                })

        };

        window.addEventListener('storage', handleStorageChange);
        handleStorageChange();

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    return (
        <>
            <RouterProvider router={router} />
            <div className="blocDeco">
                <button onClick={deconnect}>Deconnect</button>
                <a href="/main">
                    <button>Accueil</button>
                </a>
                {showAdminButton && <a href="/admin">
                    <button>Admin</button>
                </a>}
            </div>
        </>
    )
}

export default App;
