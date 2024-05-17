import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const createUser = (e) => {
        e.preventDefault();

        if(password===confirmPassword){
            const jsonDataUser = {
                login,
                email,
                password
            };

            fetch(`http://localhost:4242/register`, {
                method: "POST",
                body: JSON.stringify(jsonDataUser),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((res) => res.json())
                .then((res) => {

                    if(res.message){
                        if(res.message.message==="Register successful."){
                            navigate(`/main`)
                            localStorage.setItem("id", res.message.id);
                        }else{
                            setErrorMsg(res.message)
                        }
                    }else{
                        setErrorMsg(res.error)
                    }

                });
        }else{
            setErrorMsg("Erreur : confirmation de mot de passe incorrect, veuillez réssayer")
        }
    };

    const logUser = (e) => {
        e.preventDefault();


            const jsonDataUser = {
                email,
                password
            };

            fetch(`http://localhost:4242/login`, {
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
                if(res2.message){
                    if(res2.message.message==="Login successful."){
                        navigate(`/main`)
                        localStorage.setItem("id", res2.message.id);
                    }else{
                        setErrorMsg(res2.message)
                    }
                }else{
                    setErrorMsg(res2.error)
                }

                });
    };

    return (
        <div className="main">
            <div className="container">
                <div className="toggle">
                    <span onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>LOG IN</span>
                    <span onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>SIGN UP</span>
                    <div className="toggle-btn" style={{left: isLogin ? '0' : '50%'}}></div>
                </div>
                {isLogin ? (
                    <form className="form" onSubmit={logUser}>
                        <h2>Log In</h2>
                        <div className="input-container">
                            <input type="email" name="email" placeholder="Your email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <input type="password" name="password" placeholder="Your Password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="submit-btn">SUBMIT</button>
                    </form>
                ) : (
                    <form className="form formRegister" onSubmit={createUser}>
                        <h2>Sign Up</h2>
                        <div className="input-container">
                            <input
                                type="text"
                                name="login"
                                placeholder="Your login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="password"
                                name="password"
                                placeholder="Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button className="submit-btn" type="submit">SUBMIT</button>
                    </form>
                )}

            </div>
            <p className="error">{errorMsg}</p>
        </div>
    );
}

export default LandingPage;
