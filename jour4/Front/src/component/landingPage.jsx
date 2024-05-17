import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";


function LandingPage() {
    const [isRegister, setIsRegister] = useState(true);
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();


    const handleToggle = () => {
        setIsRegister(!isRegister);
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        if(password===confirmPassword){

            const formData = {
                email,
                login,
                password
            };

            fetch(`http://localhost:4242/register`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    localStorage.setItem("id", res.message.id);
                    navigate('/')

                });
        }else{
            setErrorMsg("Erreur lors de la confirmation du mot de passe")
        }

    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            email,
            password
        };

        fetch(`http://localhost:4242/login`, {
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
                localStorage.setItem("id", res2.message.id);
                navigate('/')
                window.location.reload();
            })
    };

    return (
        <div className="main">
            <div className="form">
                <div className="title">Welcome</div>
                <div className="subtitle">
                    {isRegister ? "Let's create your account!" : "Welcome back!"}
                </div>
                <form onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit}>
                    {isRegister ? (
                        <>
                            <div className="input-container ic1">
                                <input
                                    id="firstname"
                                    className="input"
                                    type="text"
                                    placeholder=" "
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                />
                                <div className="cut"></div>
                                <label htmlFor="firstname" className="placeholder">Login</label>
                            </div>
                            <div className="input-container ic2">
                                <input
                                    id="email"
                                    className="input"
                                    type="email"
                                    placeholder=" "
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="cut cut-short"></div>
                                <label htmlFor="email" className="placeholder">Email</label>
                            </div>
                            <div className="input-container ic2">
                                <input
                                    id="password"
                                    className="input"
                                    type="password"
                                    placeholder=" "
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="cut"></div>
                                <label htmlFor="password" className="placeholder">Password</label>
                            </div>
                            <div className="input-container ic2">
                                <input
                                    id="passwordConfirm"
                                    className="input"
                                    type="password"
                                    placeholder=" "
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <div className="cut"></div>
                                <label htmlFor="password" className="placeholder">Confirm</label>
                            </div>
                            <button type="submit" className="submit">Submit</button>
                        </>
                    ) : (
                        <>
                            <div className="input-container ic1">
                                <input
                                    id="email"
                                    className="input"
                                    type="email"
                                    placeholder=" "
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="cut cut-short"></div>
                                <label htmlFor="email" className="placeholder">Email</label>
                            </div>
                            <div className="input-container ic2">
                                <input
                                    id="password"
                                    className="input"
                                    type="password"
                                    placeholder=" "
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="cut"></div>
                                <label htmlFor="password" className="placeholder">Password</label>
                            </div>
                            <button type="submit" className="submit">Login</button>
                        </>
                    )}
                    <button type="button" className="toggle" onClick={handleToggle}>
                        {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
                    </button>
                </form>
            </div>
            <p style={{color: "red"}}>{errorMsg}</p>
        </div>
    );
}

export default LandingPage;
