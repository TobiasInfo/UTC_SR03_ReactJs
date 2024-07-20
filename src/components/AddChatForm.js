import React, {useState, useEffect} from 'react';
import {formatDateForDB, formatDateForInput} from "../utils/formatDate";
import Header from "./Header";
import Footer from "./Footer";
import api from "../Api";
import {getUserIdFromToken} from "../utils/decodeJWT";
import {useNavigate} from "react-router-dom";

const AddChatForm = (props) => {
    const [dateExpiration, setDateExpiration] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pageTitle] = useState('Ajouter un chat ');
    const [idUser, setIdUser] = useState(null);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const chat = {
            dateCreation: Date.now(),
            dateExpiration: formatDateForDB(dateExpiration),
            title: title,
            description: description,
            ownerId: idUser
        };

        api.post('http://localhost:8080/api/chat/create', chat)
            .then(response => {
                setIsLoading(false);
                setIsSuccessPopupOpen(true);
            }).catch(
            error => {
                setIsLoading(false);
                setError('Une erreur est survenue lors de la création du chat.');
                console.error(error);
            }
        );
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        } else {
            const idUser = getUserIdFromToken(token);
            if (idUser) {
                setIdUser(idUser);
            }
        }
    }, [navigate]);

    const handleSuccessPopupClose = () => {
        setIsSuccessPopupOpen(false);
        navigate(`/ChatList/${idUser}`);
    };

    return (
        <>
            <Header/>
            <div className="d-flex justify-content-center">
                <div className="centre-vertical" style={{minWidth: '35vw'}}>
                    <div className="card mx-auto b-2 my-2">
                        <div className="card-header text-center">
                            <h4>{pageTitle}</h4>
                        </div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="title">Titre</label>
                                    <input
                                        id="title"
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        placeholder="title"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input
                                        id="description"
                                        name="description"
                                        className="form-control"
                                        placeholder="description"
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dateExpiration">Date d'expiration</label>
                                    <input
                                        id="dateExpiration"
                                        name="dateExpiration"
                                        className="form-control"
                                        type="date"
                                        required
                                        value={formatDateForInput(dateExpiration)}
                                        onChange={(e) => setDateExpiration(e.target.value)}
                                    />
                                </div>
                                <div className="text-center mt-4">
                                    <button className="btn btn-primary" type="submit" disabled={isLoading}>
                                        {isLoading ? 'Sauvegarde en cours...' : 'Sauvegarder'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Popup */}
            {isSuccessPopupOpen && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{display: 'block'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Succès</h5>
                                <button type="button" className="close" aria-label="Close"
                                        onClick={() => setIsSuccessPopupOpen(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Le chat a bien été créé.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleSuccessPopupClose}>OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer/>
        </>
    );
};

export default AddChatForm;
