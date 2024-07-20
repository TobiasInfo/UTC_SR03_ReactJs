import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {formatDateForDB, formatDateForInput} from "../utils/formatDate";
import Header from "./Header";
import Footer from "./Footer";
import api from "../Api";
import {getUserIdFromToken} from "../utils/decodeJWT";

const EditChatForm = ({chat, onSubmit}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [idChat, setIdChat] = useState(id);
    const [dateCreation, setDateCreation] = useState('');
    const [dateExpiration, setDateExpiration] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [pageTitle] = useState('Edition du chat ' + id);
    const [idUser, setIdUser] = useState(null);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

    useEffect(() => {
        api.get('http://localhost:8080/api/chat/' + id)
            .then(response => {
                setIdChat(response.data.idChat);
                setDateCreation(response.data.dateCreation);
                setDateExpiration(response.data.dateExpiration);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setOwnerId(response.data.ownerId);
            }).catch(error => {
            if (error.response) {
                if (error.response.data.message === "Chat not found") {
                    console.error("Chat not found");
                }
            } else {
                console.error(error);
            }
        });
    }, [id]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        const idUser = getUserIdFromToken(token);
        if (idUser) {
            setIdUser(idUser);
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const chat = {
            idChat: idChat,
            dateCreation: dateCreation,
            dateExpiration: formatDateForDB(dateExpiration),
            title: title,
            description: description,
            ownerId: ownerId
        };

        api.put(`http://localhost:8080/api/chat/update/${idChat}`, chat)
            .then(response => {
                setIsSuccessPopupOpen(true);
            }).catch(error => {
            console.error(error);
        });
    };

    const handleSuccessPopupClose = () => {
        setIsSuccessPopupOpen(false);
        navigate(`/chatList/${idUser}`);
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
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Titre</label>
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
                                <label>Description</label>
                                <div className="form-group">
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
                                <label>Date d'expiration</label>
                                <div className="form-group">
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
                                    <button className="btn btn-primary" type="submit">
                                        Sauvegarder
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
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                        onClick={() => setIsSuccessPopupOpen(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Le chat a bien été modifié.</p>
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

export default EditChatForm;
