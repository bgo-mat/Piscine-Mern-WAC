import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ShopPage() {
    const userId = localStorage.getItem('id');
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [articles, setArticles] = useState([]);

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
        fetch(`http://localhost:4242/getArticle`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setArticles(res.result);
            });
    }, []);

    const redirectDetail= (input)=>{
        navigate(`/shopDetail?id=${input}`);
    }

    return (
        <div className="main">
            <p style={{textAlign:"center"}}>Welcome to the Shop {name} !</p>
            <div className="articles-container">
                {articles.map((article) => (
                    <div key={article._id} className="article-card" onClick={() => redirectDetail(article.id)}>
                        <h2>{article.title}</h2>
                        <p>Price: ${article.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShopPage;
