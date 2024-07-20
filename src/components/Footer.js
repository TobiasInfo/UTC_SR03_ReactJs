// src/components/Footer.js
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getUserIdFromToken} from "../utils/decodeJWT";

const Footer = () => {
    const [idUser, setIdUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const publicPaths = ['/', '/forgot-password', '/inscription' , "/aPropos"];
        const token = localStorage.getItem('token');
        console.log('token', token);
        if (!publicPaths.includes(window.location.pathname)) {
            if (token === null || token === undefined) {
                console.log('Token not found');
                navigate('/');
            }
        }
        const idUser = getUserIdFromToken(token);
        if (idUser !== null) {
            setIdUser(idUser);
        }
    }, [navigate]);

    return (
        <footer className="bg-light text-center text-lg-start">
            <div className="text-center p-1 d-flex justify-content-around">
                <p><Link className="text-black" to={`/ChatList/${idUser}`}>Accueil</Link></p>
                <p>© 2024 Copyright: <Link className="text-black" to={`/ChatList/${idUser}`}>ChatSR03</Link></p>
                <p><Link className="text-black" to="/aPropos">A propos</Link></p>
            </div>
        </footer>
    );
};

export default Footer;
