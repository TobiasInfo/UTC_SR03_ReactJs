import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Chat from "./components/Chat";
import EditChatForm from "./components/EditChatForm";
import AddChatForm from "./components/AddChatForm";
import ChatList from "./components/ChatList";
import EditUserForm from "./components/EditUserForm";
import AboutPage from "./components/AboutPage";
import ForgotPassword from "./components/ForgotPassword";
import Inscription from "./components/Inscription";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/chat/:idChat" element={<Chat/>}/>
            <Route path={'/chatList/:idUser'} element={<ChatList/>}/>
            <Route path={'/editChat/:id'} element={<EditChatForm/>}/>
            <Route path={'/addChat'} element={<AddChatForm/>}/>
            <Route path={'/editUser/:id'} element={<EditUserForm/>}/>
            <Route path={'/aPropos'} element={<AboutPage/>}/>
            <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
            <Route path={'/inscription'} element={<Inscription/>}/>
        </Routes>
    </BrowserRouter>
);

reportWebVitals();
