import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("https://chat-server-uk1i.onrender.com"); // Connect to the backend

function App() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.on("connect", () => {
            console.log(`I am connected to the sever. My id is ${socket.id}`);
        });
        socket.on("message", msg => {
            setChat(prevChat => [...prevChat, msg]); // Add new messages to chat
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        return () => socket.disconnect(); // Clean up when component unmounts
    }, []);

    const sendMessage = () => {
        if (message) {
            socket.emit("message", message); // Send message to the server
            setMessage("");
        }
    };

    return (
        <>
            <div className="container">
                <div className="title">
                    <h1>Aso chat kori 😉</h1>
                </div>
                <div className="main">
                    {/* Text will be visible here */}
                    {chat.map((msg, idx) => (
                        <p
                            key={idx}
                            className={
                                idx % 2 === 0 ? "red-message" : "yellow-message"
                            }
                        >
                            {msg}
                        </p>
                    ))}
                </div>
                <div className="text-area">
                    <input
                        type="text"
                        className="text-input"
                        placeholder="what are you thinking?.."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <button onClick={sendMessage} className="send-btn">
                        Send
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;
