import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

function FormTicket() {

    const userId = localStorage.getItem('id');
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");



    useEffect(() => {
        if(!userId){
            navigate('/log')
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
                    navigate('/log')
                    return
                }
                setName(res2.message[0].login)

            });
    }, []);

    const sendBlog = async (event) => {
        event.preventDefault();

        const formData = {
            title,
            content,
            userId,
        };

            fetch(`http://localhost:4242/createBlog`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((res2) => res2.json())
                .then((res2) => {
                    console.log(res2.message.message)
                    if(res2.message.message==="Register successful."){
                        alert("Annonce créé avec succès ! ✅")
                        window.location.reload();
                    }

                })

    };


    const closePopUp =()=>{
        document.getElementsByClassName("blocPupUp")[0].style.display="none";
    }

    const antiClick =(e)=>{
        e.stopPropagation();
    }

    return (
        <>
            <div className="blocPupUp2" onClick={closePopUp}>
                <div className="formBlog" onClick={antiClick}>

                    <div className="titleBlog">
                        <p>Welcome</p>
                        <p style={{cursor:"pointer"}} onClick={closePopUp}>X</p>
                    </div>
                    <form onSubmit={sendBlog}>
                        <div className="input-container ic1">
                            <input
                                id="firstname"
                                className="input"
                                type="text"
                                placeholder=" "
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <div className="cut"></div>
                            <label htmlFor="firstname" className="placeholder">Title</label>
                        </div>
                        <div className="inputContent ic1">
                    <textarea
                        id="firstname"
                        rows="5"
                        cols="33"
                        className="input"
                        placeholder=" "
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                            <div className="cut"></div>
                            <label htmlFor="firstname" className="placeholder">Content</label>
                        </div>
                        <button type="submit" className="submit">Submit</button>
                    </form>
                </div>
            </div>


        </>

    );
}

export default FormTicket;
