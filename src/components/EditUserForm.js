import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import api from "../Api";
import Header from "./Header";
import Footer from "./Footer";
import {getUserIdFromToken} from "../utils/decodeJWT";

const EditUserForm = ({onSubmit}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(id);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [pageTitle, setPageTitle] = useState('');
    const [idUser, setIdUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

    useEffect(() => {
        api.get(`http://localhost:8080/api/user/id/${id}`)
            .then(response => {
                setUserId(response.data.idUser);
                setEmail(response.data.email);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setPassword(response.data.password);
                setPassword2(response.data.password);
                setPageTitle('Edition de l\'utilisateur ' + response.data.firstName + ' ' + response.data.lastName);
            }).catch(error => {
            if (error.response) {
                if (error.response.data.message === "User not found") {
                    console.error("User not found");
                }
            } else {
                console.error(error);
            }
        });
    }, [id]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Token not found');
            navigate('/');
        }

        const idUser = getUserIdFromToken(token);
        if (idUser) {
            setIdUser(idUser);
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            alert("Passwords do not match.");
            return;
        }

        const user = {
            idUser: userId,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        };

        api.put(`http://localhost:8080/api/user/update/${userId}`, user)
            .then(response => {
                console.log('response', response.data);
                setIsSuccessPopupOpen(true);
            }).catch(error => {
            console.error(error);
        });
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowPassword2(!showPassword2);
        }
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
                                    <label>Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="exemple@gmail.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group visibility_password">
                                    <label>Mot de passe</label>
                                    <div className="input-group">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            placeholder="hyper_secure"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={() => togglePasswordVisibility('password')}
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
                                <div className="form-group visibility_password">
                                    <label>Confirmation du mot de passe</label>
                                    <div className="input-group">
                                        <input
                                            id="password2"
                                            name="password2"
                                            type={showPassword2 ? "text" : "password"}
                                            className="form-control"
                                            placeholder="hyper_secure"
                                            required
                                            value={password2}
                                            onChange={(e) => setPassword2(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={() => togglePasswordVisibility('password2')}
                                            >
                                                {showPassword2 ?
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
                                <div className="form-group">
                                    <label>Nom</label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        placeholder="John"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Prénom</label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        placeholder="Wick"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
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
                                <p>L'utilisateur a bien été mis à jour.</p>
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

export default EditUserForm;
