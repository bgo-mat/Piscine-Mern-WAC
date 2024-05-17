import { useEffect, useState } from 'react';
import LandingPage from './component/landingPage.jsx';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from "./component/main.jsx";
import PersonnalBlog from "./component/personnalBlog.jsx";
import DetailPage from "./component/detailPage.jsx";

function App() {
    const [name, setName] = useState("");
    const userId = localStorage.getItem('id');

    const router = createBrowserRouter([
        { path: '/log', element: <LandingPage /> },
        { path: '/', element: <MainPage /> },
        { path: '/:login', element: <PersonnalBlog /> },
        { path: '/:login/:id', element: <DetailPage /> },
    ]);

    const deconnect = () => {
        localStorage.removeItem("id");
        window.location.reload();
    }

    useEffect(() => {
        const jsonDataUser = { userId };

        fetch(`http://localhost:4242/getUser`, {
            method: "POST",
            body: JSON.stringify(jsonDataUser),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res2) => res2.json())
            .then((res2) => {

                setName(res2.message[0].login);
            });
    }, []);

    const goToBlog =()=>{
        window.location.reload();
    }


    return (
        <>
            <RouterProvider router={router}/>
            <div className="blocDeco">
                <button onClick={deconnect}>Deconnect</button>
                <a href="/">
                    <button>Accueil</button>
                </a>

                    <a onClick={goToBlog} href={`/${name}`}>
                        <button>My Blog</button>
                    </a>

            </div>
        </>
    );
}

export default App;
