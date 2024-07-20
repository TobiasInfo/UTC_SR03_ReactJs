import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Animation.css';
import Header from './Header';
import Footer from './Footer';

const AboutPage = () => {
    return (
        <>
            <Header/>
            <div className="container my-5">
                {/* Section À propos */}
                <h4 className="media-heading text-center mb-4">À propos de notre application de chat</h4>
                <p className="text-justify">
                    Bienvenue sur notre application de chat ! Nous sommes une équipe passionnée qui a développé
                    cette plateforme de communication pour connecter les utilisateurs du monde entier. Notre objectif
                    est de fournir
                    un moyen convivial, sécurisé et efficace pour que les gens puissent échanger des messages, partager
                    des idées et
                    se connecter entre eux.
                </p>
            </div>

            <div className="container my-5">
                {/* Section Avis */}
                <h4 className="text-center mb-4">Quels sont les avis de nos utilisateurs ?</h4>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="card shadow-pop-tl">
                            <div className="card-body">
                                <p className="card-text">
                                    Grâce à cette application de chat, j'ai pu communiquer facilement avec mes amis
                                    et mes collègues, peu importe où je me trouve. La convivialité de l'interface et la
                                    fluidité des échanges ont rendu mon expérience de discussion en ligne très agréable.
                                </p>
                            </div>
                            <div className="card-footer text-center">Alice</div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">
                                    J'ai découvert cette application de chat récemment et je suis impressionné par
                                    sa simplicité d'utilisation et ses fonctionnalités intuitives. Elle m'a permis de
                                    rester en contact avec mes proches et de créer de nouveaux liens de manière
                                    efficace.
                                </p>
                            </div>
                            <div className="card-footer text-center">Bob</div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">
                                    Cette application de chat a révolutionné ma manière de communiquer avec mes
                                    collègues de travail. Les discussions de groupe sont fluides. Je recommande vivement
                                    cette application à tous ceux qui cherchent une solution de messagerie
                                    professionnelle.
                                </p>
                            </div>
                            <div className="card-footer text-center">Claire</div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div className="card shadow-pop-tl">
                            <div className="card-body">
                                <p className="card-text">
                                    Grâce à cette application de chat, je suis en mesure de rester connecté avec
                                    mes amis et ma famille, même lorsque je suis en déplacement. Les conversations sont
                                    sécurisées et les fonctionnalités de confidentialité garantissent la protection de
                                    mes données
                                    personnelles.
                                </p>
                            </div>
                            <div className="card-footer text-center">David</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                {/* Section Fonctionnalités */}
                <h4 className="media-heading text-center mb-4">Fonctionnalités de notre application</h4>
                <p className="text-justify">
                    Notre application de chat offre une gamme de fonctionnalités pour améliorer votre expérience
                    de communication :
                </p>
                <ul>
                    <li><i className="fas fa-comments"></i> Messagerie instantanée : Discutez en temps réel avec vos
                        amis, votre famille et vos collègues.
                    </li>
                    <li><i className="fas fa-users"></i> Chat de groupe : Créez des groupes de discussion pour des
                        conversations thématiques ou professionnelles.
                    </li>
                    <li><i className="fas fa-lock"></i> Sécurité renforcée : Vos conversations sont protégées par des
                        mesures de sécurité avancées pour garantir la confidentialité de vos échanges.
                    </li>
                    <li><i className="fas fa-globe"></i> Disponibilité mondiale : Connectez-vous avec des utilisateurs
                        du monde entier et explorez de nouvelles cultures.
                    </li>
                </ul>
            </div>

            <div className="container my-5">
                {/* Section Carte Google Maps */}
                <h4 className="media-heading text-center mb-4">Où nous trouver ?</h4>
                <div className="text-center">
                    <iframe
                        height="300"
                        style={{border: 0, width: '100%'}}
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d851.8852479838791!2d127.78392609221298!3d26.357842073359294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDIxJzI4LjQiTiAxMjfCsDQ3JzAxLjciRQ!5e1!3m2!1sfr!2sfr!4v1685531272149!5m2!1sfr!2sfr"
                        allowFullScreen
                        title="Google Maps Location"
                    ></iframe>
                </div>
            </div>

            <div className="container my-5">
                {/* Section Nos outils */}
                <h4 className="media-heading text-center mb-4">Technologies utilisées</h4>
                <p className="text-justify">Nous avons utilisé les dernières technologies pour créer notre application
                    de chat :</p>
                <ul>
                    <li><i className="fab fa-java"></i> Java : Langage de programmation principal pour le développement
                        de
                        l'application.
                    </li>
                    <li><i className="fab fa-spring"></i> Spring Boot : Framework Java pour le développement
                        d'applications web.
                    </li>
                    <li><i className="fab fa-html5"></i> HTML5 : Langage de balisage pour la structure de la page web.
                    </li>
                    <li><i className="fab fa-css3"></i> CSS3 : Langage de feuilles de style pour la présentation de la
                        page web.
                    </li>
                    <li><i className="fab fa-js"></i> JavaScript : Langage de programmation pour les fonctionnalités
                        interactives.
                    </li>
                </ul>
            </div>

            <div className="container my-5">
                {/* Section Contact */}
                <h4 className="media-heading mb-4">Comment nous contacter ?</h4>
                <p className="text-justify">
                    Vous pouvez nous contacter par e-mail à l'adresse suivante :
                    <a href="mailto:jobhub@gmail.com" target="_blank" rel="noopener noreferrer"> ChatSR03@gmail.com</a>
                </p>
                <p className="text-justify">
                    Vous pouvez également nous contacter par téléphone au :
                    <a href="tel:+33612345678" target="_blank" rel="noopener noreferrer"> +33 6 01 02 03 04</a>
                </p>
            </div>

            <div className="container my-5">
                {/* Section Nous soutenir */}
                <h4 className="media-heading text-center mb-4" style={{color: 'green'}}>Vous souhaitez nous soutenir
                    ?</h4>
                <p className="text-justify">
                    Si vous souhaitez nous soutenir, vous pouvez nous faire un don à
                    l'adresse suivante :
                    <a href="https://www.paypal.com/paypalme/JobHub" target="_blank"
                       rel="noopener noreferrer"> paypal.me/ChatSR03</a>
                </p>
            </div>

            <div className="container my-5">
                {/* Section Vous avez trouvé un bug ? */}
                <h4 className="media-heading text-center mb-4" style={{color: 'red'}}>Mince ! Vous avez trouvé un bug
                    ?</h4>
                <p className="text-justify">
                    Si vous avez trouvé un bug, vous pouvez nous le signaler à l'adresse suivante :
                    <a href="mailto:ChatSR03.bug@gmail.com" target="_blank"
                       rel="noopener noreferrer">ChatSR03.bug@gmail.com</a>
                </p>
            </div>

            <Footer/>
        </>
    );
};

export default AboutPage;
