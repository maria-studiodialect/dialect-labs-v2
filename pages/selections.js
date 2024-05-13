import React, { useState, useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { BsStars } from "react-icons/bs";

export default function Selections() {
    const [ws, setWs] = useState(null);
    const [text, setText] = useState("masterpiece best quality, swiss scenery");
    const [message, setMessage] = useState('')
    const thunderstorm = `An abstract interpretation of a thunderstorm, with jagged bolts of lightning streaking across a tumultuous sky and torrents of rain lashing down upon a windswept landscape. The scene is charged with tension and energy, capturing the raw power of nature in motion. (masterpiece, award winning artwork)
    many details, extreme detailed, full of details,
    Wide range of colors, high Dynamic`
    const forest = `designed by John Closterman, Concept art, landscape of a serene forest comes alive with the sound of chirping birds and rustling leaves. The air is thick with the scent of pine, and a forest comes to life with mystical imagery - a tree made entirely of wood. A group of trees, at Overcast, Cosy, Cartelcore, Depth of field 270mm`
    const flowers = `flowers, water dress, (black background:1.5), best illumination, (extremely detailed hyperrealistic masterpiece), night sky, blooming dark pink flowers, ArtStation, (best quality), high contrast, bottom 5800K floodlight, game art, at a cantina`
    const birds = `bird in nature, RAW photo, colourful, hyperrealistic, cinematic, light flare`
    const robots = `((An robots in a last_supper)) (robots with computer monitors with faces instead  of heads) (masterpiece:1.2) (photorealistic:1.2) (best quality) (intricate) (8k) (HDR) (cinematic lighting) (sharp focus)`
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
                ws.send(JSON.stringify(message));
                console.log('Message sent:', JSON.stringify(message));
            } else {
                console.error('WebSocket is not connected.');
            }
        };

        if (message) {  // Ensure that empty messages are not sent initially or ever
            sendMessage();
        }
    }, [message, ws]); // Dependency on 'text' and 'ws'

    console.log(message)
    return (
        <>
        {/* 
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
                <button className='px-5 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-full flex items-center'><BsStars className='mr-2' /> Generate</button>
            </div>
            </div>
        </div>
            */}
        <div className='p-5 flex flex-col justify-center items-center w-screen'>
            <div className={`font-monument uppercase z-20 text-black mb-4 text-center leading-none`}>
                Dialect Labs
            </div>
            <div className='bg-white p-5 rounded-lg shadow-lg'>
            <div className='font-prophet font-semibold text-lg'>Select a Background Colour</div>
            <div className='flex space-x-4 mt-1 mb-10'>
                <div onClick={() => setMessage('white')} className='cursor-pointer h-10 w-10 rounded-md shadow bg-white'></div>
                <div onClick={() => setMessage('black')} className='cursor-pointer h-10 w-10 rounded-md shadow bg-black'></div>
                <div onClick={() => setMessage('green')}  className='cursor-pointer h-10 w-10 rounded-md shadow bg-green-400'></div>
                <div onClick={() => setMessage('blue')} className='cursor-pointer h-10 w-10 rounded-md shadow bg-blue-400'></div>
                <div onClick={() => setMessage('yellow')} className='cursor-pointer h-10 w-10 rounded-md shadow bg-yellow-300'></div>
                <div onClick={() => setMessage('red')} className='cursor-pointer h-10 w-10 rounded-md shadow bg-red-400'></div>
            </div>
            <div className='font-prophet font-semibold text-lg'>Select a theme</div>
            <div onClick={() => setMessage(flowers)} className="bg-[url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/56560e51-e117-4794-9003-f0c82ec18c5d/original=true/39002-g.jpeg')] bg-center h-[8vh] text-white cursor-pointer rounded-md  px-5 py-3 my-2 shadow-lg font-prophet">Flowers</div>
            <div onClick={() => setMessage(robots)}  className="bg-[url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/fc654523-70a9-4fad-8301-b5283f66b876/original=true/00312-465935130-((An%20robots%20in%20a%20last_supper))%20(robots%20with%20computer%20monitors%20with%20faces%20instead%20%20of%20heads)%20(masterpiece_1.2)%20(photorealistic_1.jpeg')] bg-center h-[8vh] text-white cursor-pointer rounded-md px-5 py-3 my-2 shadow-lg font-prophet">Robots</div>
            <div onClick={() => setMessage(thunderstorm)} className="bg-[url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/7bbc76e3-8106-49e3-91e6-4933a6f81322/original=true/00019-1057663555.jpeg')] bg-center h-[8vh] text-white cursor-pointer rounded-md px-5 py-3 my-2 shadow-lg font-prophet">Thunderstorm</div>
            <div onClick={() => setMessage(forest)} className="bg-[url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/1d7adfad-280d-4cc5-8c88-97f3a42cb7b5/original=true/8088900BBA42AB5468EFEAE413FD1584F4F2ED2F8DB7A12E06D3E3E1E945503D.jpeg')] bg-center h-[8vh] text-white cursor-pointer rounded-md px-5 py-3 my-2 shadow-lg font-prophet">Forest</div>
            <div onClick={() => setMessage(birds)} className="bg-[url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/47c9a52d-0bd1-4b9e-b38d-069ac11f97cb/original=true/10947-1530712919-Bird,%20caravaggio%20style.jpeg')] bg-center h-[8vh] text-white cursor-pointer rounded-md px-5 py-3 my-2 shadow-lg font-prophet">Birds</div>
            </div>
        </div>
        </>
    );
}