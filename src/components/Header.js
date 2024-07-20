// src/components/Header.js
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../Api";
import {getRoleFromToken, getUserIdFromToken} from "../utils/decodeJWT";


const Header = ({}) => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [idUser, setIdUser] = useState(null);
    const [role, setRole] = useState('NotAuthenticated');

    useEffect(() => {
        const publicPaths = ['/', '/forgot-password', '/inscription', "/aPropos"];
        const token = localStorage.getItem('token');
        console.log('token', token);
        if (!publicPaths.includes(window.location.pathname)) {
            if (token === null || token === undefined) {
                console.log('Token not found');
                navigate('/');
            }
        }

        const role = getRoleFromToken(token);
        if (role !== null) {
            setRole(role);
        }

        const idUser = getUserIdFromToken(token);
        if (idUser !== null) {
            setIdUser(idUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        // Supprimer les informations du localStorage
        localStorage.clear();
        sessionStorage.clear();
        // Rediriger vers la page d'accueil
        navigate('/');
    };

    useEffect(() => {
        if (idUser === undefined || idUser === null) {
            return;
        }
        api.get(`http://localhost:8080/api/user/id/${idUser}`)
            .then(response => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
            }).catch(error => {
            if (error.response) {
                if (error.response.data.message === "User not found") {
                    console.error("User not found");
                }
            } else {
                console.error(error);
            }
        });

    }, [idUser]);


    return (
        <header>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
            />
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    {(idUser === undefined || idUser === null) ? (
                        <Link className="navbar-brand" to="/">ChatSR03</Link>
                    ) : (
                        <Link className="navbar-brand" to={`/ChatList/${idUser}`}>ChatSR03</Link>

                    )}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={`/ChatList/${idUser}`}>Liste de
                                    chats</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/aPropos">À propos</Link>
                            </li>
                            {!role || role === 'NotAuthenticated' ? (
                                <li className="nav-item">
                                    <Link to="/">
                                        <button className="btn btn-primary">Connexion</button>
                                    </Link>
                                    <a href="/inscription">
                                        <button className="btn btn-primary">Rejoignez-nous</button>
                                    </a>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <div className="dropdown show">
                                        <button className="btn btn-outline-dark dropdown-toggle blanc" type="button"
                                                id="dropdownMenuLink"
                                                data-bs-toggle="dropdown"
                                                data-bs-auto-close="true"
                                                aria-haspopup="true"
                                                aria-expanded="false" style={{color: '#ffffff'}}>
                                            <span className="material-symbols-outlined">
                                                account_circle
                                            </span>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                                             aria-labelledby="dropdownMenuLink">
                                            <p className="dropdown-item"> {firstName} {lastName}</p>
                                            <Link className="dropdown-item" to={`/editUser/${idUser}`}>Modifier
                                                profil</Link>
                                            <button className="dropdown-item" onClick={handleLogout}
                                                    style={{color: '#ee6055'}}>Déconnexion
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
