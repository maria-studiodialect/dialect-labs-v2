import React, { useState, useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { BsStars } from "react-icons/bs";

export default function ServerTest() {
    const [ws, setWs] = useState(null);
    const [text, setText] = useState("masterpiece best quality, swiss scenery");

    // Initialize WebSocket connection
    useEffect(() => {
        const rws = new ReconnectingWebSocket('wss://socket-server-template-llyq.onrender.com');
        setWs(rws);

        rws.onopen = () => {
            console.log("WebSocket connected");
        };

        rws.onmessage = (message) => {
            console.log('Received:', message.data);
        };

        rws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        // Cleanup function when the component unmounts
        return () => rws.close();
    }, []);

    // Effect to send message whenever 'text' changes
    useEffect(() => {
        const sendMessage = () => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(text));
                console.log('Message sent:', JSON.stringify(text));
            } else {
                console.error('WebSocket is not connected.');
            }
        };

        if (text) {  // Ensure that empty messages are not sent initially or ever
            sendMessage();
        }
    }, [text, ws]); // Dependency on 'text' and 'ws'

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='p-3 flex items-center justify-center flex-col md:flex-row md:bg-white rounded-lg drop-shadow-xl'>
                <textarea
                    id="textInput"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className='flex-1 w-[85vw] md:w-[45vw] p-5 md:p-1 mx-2 mb-5 md:mb-0 rounded-lg h-[3vh]'
                />
            <div>
                {/* Button can be used for other operations or removed if not needed */}
                <button className='px-5 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-full flex items-center'><BsStars className='mr-2' /> Generate</button>
            </div>
            </div>
        </div>
    );
}