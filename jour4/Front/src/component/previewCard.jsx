import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import FormTicket from "./formTicket.jsx";
import modifImg from "../assets/update.svg"

function PreviewCard({ titleBlog, contentBlog, id, user_id, key }) {

    const userId = localStorage.getItem('id');
    const [display, setDisplay] = useState("none");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const [displayForm, setDisplayForm] = useState("none");
    const [name, setName] = useState("");


    useEffect(() => {
        if(parseInt(user_id) === parseInt(userId)) {
            setDisplay("block");
        } else {
            setDisplay("none");
        }
    }, [ user_id, userId]);


    const modifCard = () => {
        setDisplayForm('flex')
    }

    const sendBlog = async (event) => {
        event.preventDefault();

    const formData = {
        title,
        content,
        userId,
        id,
    };



    fetch(`http://localhost:4242/updateBlog`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then((res2) => res2.json())
        .then((res2) => {
            console.log(res2)
            if(res2.message==="ok"){
                alert("Annonce modifié avec succès ! ✅")
                window.location.reload();
            }
        })

    };

    const deleteCard = async (event) => {
        event.preventDefault();

        const formData = {
            title,
            content,
            userId,
            id,
        };



        fetch(`http://localhost:4242/deleteBlog`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res2) => res2.json())
            .then((res2) => {
                if(res2.message==="ok"){
                    alert("Annonce supprimé avec succès ! ✅")
                    window.location.reload();
                }
            })

    };

    useEffect(() => {

        const formData = {
            id,
        };

        fetch(`http://localhost:4242/getTicketById`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {

                const formDataIdUser = {
                    userId:res.message[0].id_user
                };
                fetch(`http://localhost:4242/getUser`, {
                    method: "POST",
                    body: JSON.stringify(formDataIdUser),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })
                    .then((res2) => res2.json())
                    .then((res2) => {
                        setName(res2.message[0].login)
                    });


            })
    }, []);

    const closePopUp =()=>{
        setDisplayForm("none")
    }

    const antiClick =(e)=>{
        e.stopPropagation();
    }

    const navigateDetail =()=>{
        console.log("yoyo")
        navigate(`/${name}/${id}`)
    }

    return (
        <div className="blog-preview">
            <div className="blocTitleCard">
                <h2 className="blog-title">{titleBlog}</h2>
                <div className="blocIcone">
                    <img
                        style={{display: display}}
                        onClick={modifCard}
                        className="icone"
                        src={modifImg}
                        alt="icone pour modifier l'article"
                    />
                    <p className="iconeCroix" style={{display: display}} onClick={deleteCard}>X</p>
                </div>
            </div>
            <p className="blog-content">{contentBlog}</p>
            <a className="linkMore" onClick={navigateDetail}>Lire la suite →</a>

            <div className="blocPupUp" style={{display: displayForm}} onClick={closePopUp}>
                <div className="formBlog" onClick={antiClick}>

                    <div className="titleBlog">
                        <p>Welcome</p>
                        <p style={{cursor: "pointer"}} onClick={closePopUp}>X</p>
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
        </div>
    );
}

export default PreviewCard;
