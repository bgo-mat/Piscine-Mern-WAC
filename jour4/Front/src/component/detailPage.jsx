import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import PreviewCard from "./previewCard.jsx";

function DetailPage() {

    const {login,id } = useParams();
    const userId = localStorage.getItem('id');
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [name, setName] = useState("");
    const [newComment, setNewComment] = useState("");
    const [coments, setComments] = useState([]);
    const [loadUseEffect, setLoadUseEffect] = useState();
    const [authorComment, setAuthorComment] = useState("");


    useEffect(() => {

        const formData = {
            id:parseInt(id),
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

                setTitle(res.message[0].title)
                setContent(res.message[0].content)

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

    const sendComment=()=>{

        const formData = {
            userId,
            content:newComment,
            blogId:parseInt(id),
        };



        fetch(`http://localhost:4242/createComment`, {
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
                    setLoadUseEffect(Math.random())
                    setNewComment("")
                }
            })
    }

    useEffect(() => {

        const formData = {
            id_ticket:parseInt(id),
        };

        fetch(`http://localhost:4242/getAllComment`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res2) => res2.json())
            .then(async (res) => {
            const comments = res.message;

            const commentsWithAuthors = await Promise.all(comments.map(async (comment) => {
                const formDataIdUser = {
                    userId: comment.id_user
                };

                const userResponse = await fetch(`http://localhost:4242/getUser`, {
                    method: "POST",
                    body: JSON.stringify(formDataIdUser),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });
                const userData = await userResponse.json();
                const user = userData.message[0];

                return {
                    ...comment,
                    author: user.login
                };
            }));

        setComments(commentsWithAuthors);
    })
    }, [loadUseEffect]);

  const deleteComment=(input)=>{


      const formData = {
          id:parseInt(input),
      };



      fetch(`http://localhost:4242/deleteComment`, {
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
                  setLoadUseEffect(Math.random())
              }

          })
  }



    return (
        <div className="blocPersonnal">
            <div className="blog-detail">
                <h1 className="blogTitle">{title}</h1>
                <p className="blog-author">By {name}</p>
                <div className="blogContentDetail">{content}</div>
                <p className="blog-author">Commentaire : </p>
                <div className="sendComment">
                <textarea
                    id="firstname"
                    rows="5"
                    cols="33"
                    style={{height: "5vh", width:"70%"}}
                    className="input"
                    placeholder=" "
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                    <button style={{height: "5vh"}} onClick={sendComment}>Send</button>
                </div>
                <div className="blocNewComment">
                    {coments.map((article, index) => (
                        <div className="blocContentCom" key={index}>
                            <p style={{width: "30%"}} className="blog-author">By : {article.author}</p>
                            <p style={{color: "black"}}>{article.content}</p>
                            {parseInt(article.id_user) === parseInt(userId) && (
                                <p style={{color: "black"}} className="iconeCroix" onClick={() => deleteComment(article.id)}>X</p>
                                )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
