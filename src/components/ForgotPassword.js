import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header";
import Footer from "./Footer";
import api from "../Api"; // Assurez-vous que ce module est correctement configuré pour faire des requêtes axios

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('email', email);
        try {
            await api.post('http://localhost:8080/api/user/forgotPassword', {email});
            setMessage('Un email de réinitialisation du mot de passe a été envoyé.');
            setError('');
        } catch (err) {
            console.error(err);
            setMessage('');
            setError('Erreur lors de l\'envoi de l\'email. Veuillez réessayer.');
        }
    };

    return (
        <>
            <Header/>
            <div className="container d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
                <div className="card" style={{maxWidth: '400px', width: '100%'}}>
                    <div className="card-body">
                        <h4 className="card-title text-center">Mot de passe oublié</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Entrez votre email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="text-center mt-4">
                                <button type="submit" className="btn btn-primary">Envoyer</button>
                            </div>
                        </form>
                        {message && <div className="alert alert-success mt-3">{message}</div>}
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default ForgotPassword;
