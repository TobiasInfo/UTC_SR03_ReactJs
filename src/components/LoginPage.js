import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import Head from "./Head";
import api from "../Api";
import {Link, useNavigate} from 'react-router-dom';


const LoginPage = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [desactivated, setDesactivated] = useState(false);
    const [askAdmin, setAskAdmin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Handles user login.
    const handleLogin = (e) => {
        e.preventDefault();
        api.post("http://localhost:8080/api/user/login", {email: email, password: password})
            .then(res => {
                // Login simple
                sessionStorage.setItem("userId", res.data.idUser)
                // Token JWT
                if (res.headers.authorization) {
                    sessionStorage.setItem("token", res.headers.authorization)
                    localStorage.setItem("token", res.headers.authorization)
                    const tok = localStorage.getItem("token")
                    console.log("token from local storage = " + tok)
                    navigate(`/ChatList/${res.data.idUser}`);
                }
            })
            .catch(error => {
                console.log(error);
                if (error.response) {
                    const message = error.response.data.message;
                    if (message === "Login ou mot de passe incorrect" || message === "No user with this email") {
                        setInvalid(true);
                    }
                    if (message === "Account is desactivated") {
                        setDesactivated(true);
                        setAskAdmin(true);
                    }
                }
            })
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Head/>
            <div className="d-flex justify-content-center">
                <div className="centre-vertical" style={{minWidth: '35vw'}}>
                    <div className="card mx-auto b-2 my-2">
                        <div className="card-header text-center">
                            <h4>Connexion</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="exemple@gmail.com"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group visibility_password">
                                    <label htmlFor="password">Mot de passe</label>
                                    <div className="input-group">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className="form-control"
                                            placeholder="hyper_secure"
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ?
                                                    <span className="material-symbols-outlined">
                                                    visibility
                                                </span> :
                                                    <span className="material-symbols-outlined">
                                                    visibility_off
                                                </span>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-4">
                                    <button className="btn btn-primary" type="submit" onClick={handleLogin}>
                                        Se connecter
                                    </button>
                                </div>
                                {/*  TODO : handle forgot password */}
                                <div className="text-center mt-4">
                                    <Link to="/forgot-password" className="forgot-password-link">Mot de passe oublié
                                        ?</Link>
                                </div>
                                {invalid && (
                                    <div className="mt-3 alert alert-danger" role="alert">
                                        <span>Erreur lors de l'authentification</span>
                                    </div>
                                )}
                                {desactivated && (
                                    <div className="mt-3 alert alert-danger" role="alert">
                                        <span>Plus de 3 tentatives échouées, votre compte a été désactivé.</span>
                                    </div>
                                )}
                                {askAdmin && (
                                    <div className="mt-3 alert alert-danger" role="alert">
                                        <span>Veuillez demander à un administrateur de réactiver votre compte.</span>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
