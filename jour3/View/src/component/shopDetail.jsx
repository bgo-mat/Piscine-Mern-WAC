import React, { useEffect, useState } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

function ShopDetail() {
    const userId = localStorage.getItem('id');
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [articles, setArticles] = useState([]);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const articleId = params.get('id');

    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (!userId) {
            navigate('/');
            return;
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
                if (res2.message === "Undefined") {
                    navigate('/');
                    return;
                }
                setName(res2.message[0].login);
            });
    }, [userId, navigate]);

    useEffect(() => {

        console.log(articleId)

        const jsonDataArticle = {
            articleId
        };

        fetch(`http://localhost:4242/getArticleDetail`, {
            method: "POST",
            body: JSON.stringify(jsonDataArticle),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res.result[0]);
                setTitle(res.result[0].title)
                setPrice(res.result[0].price)
                setDescription(res.result[0].description)

            });
    }, []);


    return (
        <div className="main">
            <p>page détail</p>
            <div className="article-card">
                <h2>{title}</h2>
                <p>Price : {price}</p>
                <p>Description : {description}</p>
            </div>
        </div>
    );
}

export default ShopDetail;
