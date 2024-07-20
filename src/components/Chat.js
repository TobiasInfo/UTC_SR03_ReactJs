import React, { useEffect, useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBTypography,
    MDBTextArea,
    MDBCardHeader,
} from "mdb-react-ui-kit";
import './Chat.css';
import { parseJwt } from "../utils/decodeJWT";
import Header from "./Header";
import { useParams } from 'react-router-dom';
import Footer from "./Footer";
import api from "../Api";

const Chat = () => {
    const { idChat } = useParams();
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [chatTitle, setChatTitle] = useState('test');

    useEffect(() => {
        const fetchUsers = async () => {
            console.log("Fetching users for chat");
            try {
                const response = await api.get(`http://localhost:8080/api/chat/users/${idChat}`);
                const connectedResponse = await api.get(`http://localhost:8080/api/chat/connectedUsers/${idChat}`);
                const test =  await api.get(`http://localhost:8080/api/chat/${idChat}`);
                setChatTitle(test.data.title);
                const connectedUsers = new Set(connectedResponse.data);
                const parsedUsers = response.data.map(user => ({
                    id: user.idUser,
                    name: `${user.firstName} ${user.lastName}`,
                    avatar: `https://ui-avatars.com/api/?background=random&name=${user.firstName}+${user.lastName}`,
                    status: connectedUsers.has(user.idUser) ? "Connected" : "Disconnected"
                }));
                console.log("Voici les users recup :")
                console.log(parsedUsers);
                setUsers(parsedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [idChat]);

    const sendMessage = (text) => {
        const tok = localStorage.getItem("token");
        const decodedInfo = parseJwt(tok);
        const idUser = decodedInfo.userId;

        const user = users.find(user => user.id === idUser);

        if(!user) {
            console.error("User not found");
            return;
        }

        const newMessage = {
            type: "message",
            idUser: idUser,
            text: text,
            time: new Date().toISOString(),
            avatar: user ? user.avatar : "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp",
            isSent: true
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);

        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(newMessage));
        } else {
            console.error('WebSocket is not open. Unable to send message.');
        }

        document.getElementById("textAreaExample").value = "";
    };



    const receiveMessage = (data) => {
        try {
            console.log("Raw data received:", data);

            // Utilisation d'une expression régulière pour extraire l'objet JSON
            const jsonMatch = data.match(/\{.*\}/);
            if (!jsonMatch) {
                throw new Error("No JSON object found in the received data.");
            }

            const parsedData = JSON.parse(jsonMatch[0]);
            console.log("Parsed message:", parsedData);

            if (parsedData.type === 'userStatusUpdate') {
                const connectedUsers = parsedData.connectedUsers;
                updateConnectedUsers(connectedUsers);
            } else if (parsedData.type === 'message') {
                const newMessage = {
                    idUser: parsedData.idUser,
                    text: parsedData.text,
                    time: parsedData.time,  // Already in ISO format
                    avatar: parsedData.avatar,
                    isSent: false
                };

                setMessages(prevMessages => [...prevMessages, newMessage]);
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
            console.error("Data received:", data);
        }
    };


    const updateConnectedUsers = (connectedUsers) => {
        setUsers(prevUsers =>
            prevUsers.map(user => ({
                ...user,
                status: connectedUsers.includes(user.id) ? "Connected" : "Disconnected"
            }))
        );
    };

    useEffect(() => {
        console.log("Identifiant du chat : " + idChat);
        const tok = localStorage.getItem("token");
        const decodedInfo = parseJwt(tok);
        const idUser = decodedInfo.userId;

        const newSocket = new WebSocket(`ws://localhost:8080/WebSocketServer/${idChat}/${idUser}`);
        setSocket(newSocket);

        newSocket.onopen = () => {
            console.log('WebSocket connection established');
        };

        newSocket.onmessage = (event) => {
            try {
                receiveMessage(event.data);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };

        newSocket.onclose = (event) => {
            if (!event.wasClean) {
                console.error('WebSocket closed unexpectedly:', event);
            } else {
                console.log('WebSocket connection closed');
            }
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            newSocket.close();
        };
    }, [idChat]);

    const sortedMessages = [...messages].sort((a, b) => new Date(a.time) - new Date(b.time));

    return (
        <>
            <Header />
            <div className={"TEST"}>
                <MDBContainer fluid className="py-5 gradient-custom">
                    <h1 className="text-center text-white">{chatTitle}</h1>
                    <MDBRow>
                        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                            <h5 className="font-weight-bold mb-3 text-center text-white">
                                Participants
                            </h5>
                            <MDBCard className="mask-custom">
                                <MDBCardBody>
                                    <MDBTypography listUnStyled className="mb-0">
                                        {users.map(user => (
                                            <li
                                                key={user.id}
                                                className="p-2 border-bottom"
                                                style={{
                                                    borderBottom: "1px solid rgba(255,255,255,.3) !important",
                                                }}
                                            >
                                                <a
                                                    href="#!"
                                                    className="d-flex justify-content-between link-light"
                                                >
                                                    <div className="d-flex flex-row">
                                                        <img
                                                            src={user.avatar}
                                                            alt="avatar"
                                                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                            width="60"
                                                        />
                                                        <div className="pt-1">
                                                            <p className="fw-bold mb-0">{user.name}</p>
                                                            <p className="small text-white">
                                                                {user.status}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="pt-1">
                                                        {user.status === "Connected" && (
                                                            <div className="rounded-circle" style={{
                                                                backgroundColor: 'green',
                                                                width: '10px',
                                                                height: '10px'
                                                            }}></div>
                                                        )}
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                    </MDBTypography>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                        <MDBCol md="6" lg="7" xl="8">
                            <div className="chat-container" style={{ maxHeight: "500px", overflowY: "auto" }}>
                                <MDBTypography listUnStyled className="text-white">
                                    {sortedMessages.map((message, index) => (
                                        <li key={index} className="d-flex mb-4">
                                            {message.isSent ? (
                                                <div className="d-flex flex-row-reverse align-items-center w-100">
                                                    <img
                                                        src={message.avatar}
                                                        alt="avatar"
                                                        className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                                        width="60"
                                                    />
                                                    <MDBCard className="w-100 mask-custom" style={{ width: 'fit-content' }}>
                                                        <MDBCardHeader
                                                            className="d-flex justify-content-between p-3"
                                                            style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}>
                                                            <p className="fw-bold mb-0">Moi</p>
                                                            <p className="text-light small mb-0">
                                                                <MDBIcon far icon="clock" /> {new Date(message.time).toLocaleTimeString()}
                                                            </p>
                                                        </MDBCardHeader>
                                                        <MDBCardBody>
                                                            <p className="mb-0">{message.text}</p>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                </div>
                                            ) : (
                                                <div className="d-flex flex-row align-items-center w-100">
                                                    <img
                                                        src={message.avatar}
                                                        alt="avatar"
                                                        className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                                        width="60"
                                                    />
                                                    <MDBCard className="w-100 mask-custom" style={{ width: 'fit-content' }}>
                                                        <MDBCardHeader
                                                            className="d-flex justify-content-between p-3"
                                                            style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                                                        >
                                                            <p className="fw-bold mb-0">{users.find(user => user.id === parseInt(message.idUser))?.name}</p>
                                                            <p className="text-light small mb-0">
                                                                <MDBIcon far icon="clock" /> {new Date(message.time).toLocaleTimeString()}
                                                            </p>
                                                        </MDBCardHeader>
                                                        <MDBCardBody>
                                                            <p className="mb-0">{message.text}</p>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                    <div className={"txt row"}>
                                        <li className="mb-3 col-10">
                                            <MDBTextArea label="Message" id="textAreaExample" rows={4} />
                                        </li>

                                        <button
                                            className="btn btn-light btn-sm mt-2 col-2 custom-btn"
                                            onClick={() => sendMessage(document.getElementById("textAreaExample").value)}
                                        >
                                            Send
                                        </button>
                                    </div>
                                </MDBTypography>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
            <Footer/>
        </>
    );
};

export default Chat;
