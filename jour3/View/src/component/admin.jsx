import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

function AdminPage() {

    const userId = localStorage.getItem('id');
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");



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
                console.log(res2)
                if(res2.message==="Undefined"){
                    navigate('/')
                    return
                }
                if(res2.message[0].admin===false){
                    navigate('/main')
                    return
                }
                setName(res2.message[0].login)

            });
    }, []);

    const createArticle = (e) => {
        e.preventDefault();


            const jsonDataUser = {
                title,
                price,
                description
            };

            fetch(`http://localhost:4242/createArticle`, {
                method: "POST",
                body: JSON.stringify(jsonDataUser),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((res) => res.json())
                .then((res) => {

                    console.log(res)

                });
    };




    return (
        <div className="main">
            <p>Welcome to the Admin page {name} ! You can create an article here</p>

            <form className="form formRegister" onSubmit={createArticle}>
                <h2>New Article</h2>
                <div className="input-container">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        name="email"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <textarea

                        name="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button className="submit-btn" type="submit">ADD</button>
            </form>


        </div>

    );
}

export default AdminPage;
