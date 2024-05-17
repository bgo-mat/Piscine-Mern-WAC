import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import FormTicket from "./formTicket.jsx";
import PreviewCard from "./previewCard.jsx";

function PersonnalBlog() {

    const userId = localStorage.getItem('id');
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [articles, setArticles] = useState([]);
    const login = useParams();


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
                if(res2.message[0].login===login.login){
                    setName(res2.message[0].login)
                }else{
                    document.getElementsByClassName("buttonCreate")[0].style.display="none"
                    document.getElementsByClassName("buttonCreate")[1].style.display="none"
                }


            });
    }, []);

    useEffect(() => {

        if(login){
            fetch(`http://localhost:4242/${login.login}`, {
                method: "GET",
            })
                .then((res2) => res2.json())
                .then((res2) => {
                    if(res2.message==="No user"){
                        document.getElementsByClassName("blocArticle")[0].style.display="none";
                    }else{
                        setArticles(res2.message);
                    }

                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        }
    }, [login]);


    const showPopUp =()=>{
        document.getElementsByClassName("blocPupUp2")[0].style.display="flex";
    }

    return (
        <div className="blocPersonnal">
            <p className="TitleCreate" style={{width:"90%"}}>Welcome {name} ! Here is your personnal blog</p>

            <button className="buttonCreate" style={{width:"60%"}} onClick={showPopUp}>Click here to create a new blog !</button>
            <div className="blocArticle">
                <div className="blog-list">
                    {articles.map((article, index) => (
                        <PreviewCard titleBlog={article.title} key={index}  contentBlog={article.content} user_id={article.id_user} id={article.id} />
                    ))}
                </div>
            </div>

            <FormTicket/>
        </div>

    );
}

export default PersonnalBlog;
