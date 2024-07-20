import React, {useEffect, useState} from 'react';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useParams} from 'react-router-dom';
import {formatDate, formatDateForDB} from '../utils/formatDate';
import Footer from "./Footer";
import api from "../Api";

const ChatList = () => {
    const {idUser} = useParams();
    const [chats, setChats] = useState([]);
    const [filterType, setFilterType] = useState({owner: true, guest: true});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSuccessPopupOpenAddUser, setIsSuccessPopupOpenAddUser] = useState(false);
    const [isSuccessPopupOpenDelete, setIsSuccessPopupOpenDelete] = useState(false);


    const handleSuccessPopupCloseAddUser = () => {
        setIsSuccessPopupOpenAddUser(false);
    };

    const handleSuccessPopupCloseDelete = () => {
        setIsSuccessPopupOpenDelete(false);
    }

    useEffect(() => {
        api.get(`http://localhost:8080/api/chat/all/${idUser}?page=${currentPage}&size=${pageSize}`)
            .then(response => {
                setChats(response.data.content);
                console.log(response.data);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => {
                console.error(error);
            });
    }, [idUser, currentPage, pageSize]);

    useEffect(() => {
        api.get('http://localhost:8080/api/user/userList')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleDeleteChat = (id) => {
        api.delete(`http://localhost:8080/api/chat/chats/${id}`)
            .then(response => {
                setChats(chats.filter(chat => chat.idChat !== id));
                setIsSuccessPopupOpenDelete(true);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleDeleteInvitation = (idChat, idUser) => {
        api.delete(`http://localhost:8080/api/chat/invitation/${idChat}/${idUser}`)
            .then(response => {
                setChats(chats.filter(chat => chat.idChat !== idChat));
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleInviteUser = (chatId) => {
        setSelectedChatId(chatId);
        setIsPopupOpen(true);
    };

    const handleSaveUser = () => {
        const idUser = document.getElementById('userSelect').value;
        api.put(`http://localhost:8080/api/chat/invite/${idUser}/${selectedChatId}`)
            .then(response => {
                setIsPopupOpen(false);
                setIsSuccessPopupOpenAddUser(true);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleFilterChange = (type) => {
        setFilterType(prevFilterType => ({
            ...prevFilterType,
            [type]: !prevFilterType[type]
        }));
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value));
        setCurrentPage(0);
    };

    const filteredChats = chats.filter(chat => {
        const isOwner = chat.ownerId === parseInt(idUser);
        const isGuest = chat.ownerId !== parseInt(idUser);

        if (filterType.owner && filterType.guest) {
            return true;
        } else if (filterType.owner) {
            return isOwner;
        } else if (filterType.guest) {
            return isGuest;
        } else {
            return false;
        }
    }).filter(chat => chat.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            <div>
                <Header/>
                <div className="container mt-4">
                    <h2 className="text-center">Liste des Chats</h2>
                    <div className="row">
                        <div className="col-1">
                            <Link to={'/addChat'} className="btn">
                                <span className="material-symbols-outlined">add</span>
                                <p>Ajouter un chat</p>
                            </Link>
                        </div>
                        <div className="col-2">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="ownerchat"
                                    name="ownerchat"
                                    checked={filterType.owner}
                                    onChange={() => handleFilterChange('owner')}
                                />
                                <label className="form-check-label" htmlFor="ownerchat">Propriétaire</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="guestChat"
                                    name="guestChat"
                                    checked={filterType.guest}
                                    onChange={() => handleFilterChange('guest')}
                                />
                                <label className="form-check-label" htmlFor="guestChat">Invité</label>
                            </div>
                        </div>
                        <div className="col-5"></div>
                        <div className="col-4">
                            <input
                                type="text"
                                placeholder="Recherche par titre..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="container">
                        {filteredChats.length === 0 ? (
                            <div className="container">
                                <div className="alert alert-danger alert-dismissible text-center fade show"
                                     role="alert">
                                    Il n'y a pas de chats ...
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="alert alert-success alert-dismissible text-center fade show"
                                     role="alert">
                                    Ajouter un chat ...
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                    ></button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {filteredChats.map(chat => (
                                    <div className="container-fluid media border ml-5 mr-5 my-1" key={chat.idChat}>
                                        <div className="row">
                                            <div className="col">
                                                <div className="media-body">
                                                    <div className="row">
                                                        <div id="userDisplay" className="col">
                                                            <div className="d-flex justify-content-center">
                                                                <Link to={`/chat/${chat.idChat}`}>
                                                                    <h4 className="media-heading">
                                                                        <span> Chat {chat.idChat} : {chat.title}</span>
                                                                    </h4>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p> Description : {chat.description}</p>
                                                    <p> Date de création : {formatDate(chat.dateCreation)}</p>
                                                    <p> Date de d'expiration : {formatDate(chat.dateExpiration)}</p>
                                                </div>
                                            </div>

                                            <div className="col-1">
                                                {(String(chat.ownerId) === String(idUser)) ? (
                                                    <div className="d-flex flex-column justify-content-center mt-4">
                                                        <Link
                                                            className="btn btn-primary mb-2"
                                                            to={`/editChat/${chat.idChat}`}
                                                        >
                                                            <span className="material-symbols-outlined"> edit </span>
                                                        </Link>
                                                        <button
                                                            className="btn btn-danger mb-2"
                                                            onClick={() => handleDeleteChat(chat.idChat)}
                                                        >
                                                            <span className="material-symbols-outlined"> delete </span>
                                                        </button>
                                                        <button
                                                            className="btn btn-primary mb-2"
                                                            onClick={() => handleInviteUser(chat.idChat)}
                                                        >
                                                            <span className="material-symbols-outlined"> person_add </span>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="d-flex flex-column justify-content-center mt-5">
                                                        <button
                                                            className="btn btn-danger mb-2"
                                                            onClick={() => handleDeleteInvitation(chat.idChat, idUser)}
                                                        >
                                                            <span className="material-symbols-outlined"> logout </span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Popup for inviting user */}
                    {isPopupOpen && (
                        <div className="modal show" tabIndex="-1" role="dialog" style={{display: 'block'}}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Inviter un utilisateur</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                                onClick={() => setIsPopupOpen(false)}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label htmlFor="userSelect">Sélectionner un utilisateur</label>
                                            <select className="form-control" id="userSelect">
                                                {users.map(user => (
                                                    <option key={user.idUser} value={user.idUser}>{user.email}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                                onClick={() => setIsPopupOpen(false)}>Annuler
                                        </button>
                                        <button type="button" className="btn btn-primary"
                                                onClick={handleSaveUser}>Enregistrer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <nav>
                            <ul className="pagination">
                                {[...Array(totalPages).keys()].map(number => (
                                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                        <button onClick={() => handlePageChange(number)} className="page-link">
                                            {number + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div>
                            <label htmlFor="pageSizeSelect" className="mr-2">Éléments par page:</label>
                            <select id="pageSizeSelect" className="form-control"
                                    style={{width: 'auto', display: 'inline-block'}} onChange={handlePageSizeChange}
                                    value={pageSize}>
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {/* Success Popup */}
            {isSuccessPopupOpenAddUser && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{display: 'block'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Succès</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                        onClick={() => setIsSuccessPopupOpenAddUser(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>L'utilisateur a bien été ajouté.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleSuccessPopupCloseAddUser}>OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Success Popup */}
            {isSuccessPopupOpenDelete && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{display: 'block'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Succès</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                        onClick={() => setIsSuccessPopupOpenDelete(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Le chat a bien été supprimé.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleSuccessPopupCloseDelete}>OK
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

export default ChatList;
