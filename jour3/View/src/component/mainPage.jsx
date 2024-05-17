import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

function MainPage() {

    const userId = localStorage.getItem('id');
    const [name, setName] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        if(!userId){
            navigate('/')
            return
        }

        const jsonDataUser = {
            userId
        };

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
                if(res2.message==="Undefined"){
                    navigate('/')
                    return
                }
                setName(res2.message[0].login)

            });
    }, []);

    const redirectShop =()=>{
        navigate('/shop')
    }



    return (
        <>
            <p>Welcome {name} !</p>

            <button onClick={redirectShop}>Go to Shop</button>
        </>

    );
}

export default MainPage;
