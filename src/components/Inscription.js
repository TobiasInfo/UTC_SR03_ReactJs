import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import {useNavigate} from 'react-router-dom';

const Inscription = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

    const navigate = useNavigate();

    const generateRandomPassword = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        let generatedPassword = '';
        for (let i = 0; i < 15; i++) {
            generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(generatedPassword);
        setPassword2(generatedPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Password confirmation check
        if (password !== password2) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        if (!/^[a-zA-Z]+$/.test(lastName) || !/^[a-zA-Z]+$/.test(firstName)) {
            setError('Le nom et le prénom ne doivent contenir que des lettres.');
            return;
        }
        // API call for user registration
        try {
            await axios.post('http://localhost:8080/api/user/inscription', {
                email,
                password,
                lastName,
                firstName
            });
            setMessage('Inscription réussie !');
            setError('');
            setIsSuccessPopupOpen(true);
        } catch (err) {
            setError('Erreur lors de l\'inscription. Veuillez réessayer.');
            setMessage('');
        }
    };

    const handleSuccessPopupClose = () => {
        setIsSuccessPopupOpen(false);
        navigate('/');
    };

    return (
        <>
            <Header/>
            <div className="d-flex justify-content-center">
                <div className="centre-vertical" style={{minWidth: '35vw'}}>
                    <div className="card mx-auto b-2 my-2">
                        <div className="card-header text-center">
                            <h4>Inscription</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="exemple@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mot de passe</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="hyper_secure"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirmation du mot de passe</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="hyper_secure"
                                        value={password2}
                                        onChange={(e) => setPassword2(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nom</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="John"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Prénom</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Wick"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="text-center mt-4">
                                    <button type="submit" className="btn btn-primary">
                                        Sauvegarder
                                    </button>
                                </div>
                                <div className="text-center mt-2">
                                    <button type="button" className="btn btn-secondary"
                                            onClick={generateRandomPassword}>
                                        Générer un mot de passe aléatoire
                                    </button>
                                </div>
                            </form>
                            {message && <div className="alert alert-success mt-3">{message}</div>}
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
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
                                <p>Inscription réussie !</p>
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

export default Inscription;
