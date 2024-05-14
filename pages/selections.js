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
    const robots = `((A robots in a last_supper)) (robots with computer monitors with faces instead  of heads) (masterpiece:1.2) (photorealistic:1.2) (best quality) (intricate) (8k) (HDR) (cinematic lighting) (sharp focus)`
    const lego = `Creating Stunning 3D LEGO Renders, Buildings, with Realistic Textures, Charming Designs, and Magical Atmosphere`
    const pixelArt = `pixel-art, low-res, blocky, pixel art style, 8-bit graphics, colorful`
    const pixar = `cute modern disney style, Pixar 3d portrait, ultra detailed, gorgeous, 3d zbrush, trending on dribbble, 8k render`
    const space = `exploring the cosmos, floating among planets and stars, high quality detail, anime screencap, studio ghibli style, illustration, high contrast, masterpiece, best quality`
    const psychedelic = `autumn forest landscape, psychedelic style, vibrant colors, swirling patterns, abstract forms, surreal, trippy, colorful`
    const vaporwave = `vaporwave style, retro aesthetic, cyberpunk, vibrant, neon colors, vintage 80s and 90s style, highly detailed`
    const gradients = `gradient background, pastel colors, background reference, empty, smooth transition, horizontal layout, visually pleasing, calming, relaxing`
    const portrait = `Portrait of a bold person, wavy hair , sunglasses, sparkling eyes, geometric patterns, vibrant contrasts, semi abstract art, texturized, multi-textured, cross-hatching, shading, stacking, overlays, layered pointillism, artistic, aesthetically enhanced, grunge, gritty`
    
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
            <div className='grid grid-cols-2 gap-x-4'>
            <div onClick={() => setMessage(flowers)} className={`bg-[url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/56560e51-e117-4794-9003-f0c82ec18c5d/original=true/39002-g.jpeg')] bg-center h-[8vh] text-white cursor-pointer rounded-md  px-5 py-3 my-2 font-prophet ${message === flowers ? 'opacity-60 shadow-xl':'opacity-100'}`}>Flowers</div>
            <div onClick={() => setMessage(robots)}  className={`bg-[url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/fc654523-70a9-4fad-8301-b5283f66b876/original=true/00312-465935130-((An%20robots%20in%20a%20last_supper))%20(robots%20with%20computer%20monitors%20with%20faces%20instead%20%20of%20heads)%20(masterpiece_1.2)%20(photorealistic_1.jpeg')] bg-center h-[8vh] text-white cursor-pointer rounded-md px-5 py-3 my-2 font-prophet ${message === robots ? 'opacity-60 shadow-xl':'opacity-100'}`}>Robots</div>
            <div onClick={() => setMessage(thunderstorm)} className={`bg-[url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/7bbc76e3-8106-49e3-91e6-4933a6f81322/original=true/00019-1057663555.jpeg')] bg-center h-[8vh] text-white cursor-pointer rounded-md px-5 py-3 my-2 font-prophet ${message === thunderstorm ? 'opacity-60 shadow-xl':'opacity-100'}`}>Thunderstorm</div>
            <div onClick={() => setMessage(forest)} className={`bg-[url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/1d7adfad-280d-4cc5-8c88-97f3a42cb7b5/original=true/8088900BBA42AB5468EFEAE413FD1584F4F2ED2F8DB7A12E06D3E3E1E945503D.jpeg')] bg-center h-[8vh] text-white cursor-pointer rounded-md px-5 py-3 my-2 font-prophet ${message === forest ? 'opacity-60 shadow-xl':'opacity-100'}`}>Forest</div>
            <div onClick={() => setMessage(birds)} className={`bg-[url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/afe1c3f7-e271-44ed-b3bd-12363469cf02/original=true/00193-realvisxlV20_v20Bakedvae.jpeg')] bg-[5%_40%] h-[8vh] text-white cursor-pointer rounded-md px-5 py-3 my-2 font-prophet ${message === birds ? 'opacity-60 shadow-xl':'opacity-100'}`}>Birds</div>
            <div onClick={() => setMessage(lego)} className={`bg-[url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/8914feef-4c07-4a3c-857b-4d899b56189d/original=true/19886-363690664-lego,%20,%20(landscape_0.6),%20minecraft,.jpeg')] bg-top h-[8vh] text-white cursor-pointer rounded-md  px-5 py-3 my-2 font-prophet ${message === lego ? 'opacity-60 shadow-xl':'opacity-100'}`}>Lego</div>
            {/*<div onClick={() => setMessage(pixelArt)}  className={`bg-[url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/fc654523-70a9-4fad-8301-b5283f66b876/original=true/00312-465935130-((An%20robots%20in%20a%20last_supper))%20(robots%20with%20computer%20monitors%20with%20faces%20instead%20%20of%20heads)%20(masterpiece_1.2)%20(photorealistic_1.jpeg')] bg-center h-[8vh] text-white cursor-pointer rounded-md px-5 py-3 my-2 font-prophet ${message === pixelArt ? 'opacity-60 shadow-xl':'opacity-100'}`}>Pixel Art</div>*/}
            <div onClick={() => setMessage(pixar)} className={`bg-[url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/3937171a-3f46-47d9-84b2-32d262f41563/original=true/50000011129_75_00001_.jpeg')] bg-center h-[8vh] text-white cursor-pointer rounded-md px-5 py-3 my-2 font-prophet ${message === pixar ? 'opacity-60 shadow-xl':'opacity-100'}`}>Pixar</div>
            <div onClick={() => setMessage(space)} className={`bg-[url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/407fa911-6026-4c5c-6077-b0b015a2d200/original=true/00073-1215230328.jpeg')] bg-center h-[8vh] text-white cursor-pointer rounded-md px-5 py-3 my-2 font-prophet ${message === space ? 'opacity-60 shadow-xl':'opacity-100'}`}>Space</div>
            <div onClick={() => setMessage(psychedelic)} className={`bg-[url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/87f9b20f-ff84-44eb-8d64-986fd8bb40a6/original=true/00000-775415444.jpeg')] bg-center h-[8vh] text-white cursor-pointer rounded-md px-5 py-3 my-2 font-prophet ${message === psychedelic ? 'opacity-60 shadow-xl':'opacity-100'}`}>Psychedelic</div>
            {/*<div onClick={() => setMessage(vaporwave)} className={`bg-[url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/080e41ea-777d-481e-a5a3-efcf7832c4f0/original=true/vaporwave%208.jpeg')] bg-center h-[8vh] text-white cursor-pointer rounded-md  px-5 py-3 my-2 font-prophet ${message === vaporwave ? 'opacity-60 shadow-xl':'opacity-100'}`}>Vaporwave</div>*/}
            {/*<div onClick={() => setMessage(portrait)}  className={`bg-[url('')] bg-center h-[8vh] text-white cursor-pointer rounded-md px-5 py-3 my-2 font-prophet ${message === portrait ? 'opacity-60 shadow-xl':'opacity-100'}`}>Portrait</div>*/}
            <div onClick={() => setMessage(gradients)} className={`bg-[url('https://i.pinimg.com/564x/4e/07/e7/4e07e7f7019f3a05f2f506fb9e6f6a6f.jpg')] bg-center h-[8vh] text-white cursor-pointer rounded-md px-5 py-3 my-2 font-prophet ${message === gradients ? 'opacity-60 shadow-xl':'opacity-100'}`}>Gradients</div>
            </div>
            </div>
        </div>
        </>
    );
}