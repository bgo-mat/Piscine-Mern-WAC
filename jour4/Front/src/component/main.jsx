import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import FormTicket from "./formTicket.jsx";
import PreviewCard from "./previewCard.jsx";

function MainPage() {

    const userId = localStorage.getItem('id');
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [articles, setArticles] = useState([]);


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

    useEffect(() => {

        if(name){
            fetch(`http://localhost:4242/`, {
                method: "GET",
            })
                .then((res2) => res2.json())
                .then((res2) => {
                    setArticles(res2.message);
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        }
    }, [name]);



    return (
        <div className="blocPersonnal">
            <p className="TitleCreate" style={{width: "90%"}}>Welcome {name} ! Here is every blog</p>

            <div className="blocArticle">
                <div className="blog-list">
                    {articles.map((article, index) => (
                        <PreviewCard titleBlog={article.title}  key={index}  contentBlog={article.content} user_id={article.id_user} id={article.id} />
                    ))}
                </div>
            </div>
        </div>

    );
}

export default MainPage;
