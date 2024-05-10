import React, { useState, useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { BsStars } from "react-icons/bs";


export default function ServerTest() {
    const [ws, setWs] = useState(null);
    const [text, setText] = useState("masterpiece best quality, swiss scenery");


    useEffect(() => {
        // Initialize WebSocket connection
        const rws = new ReconnectingWebSocket('wss://socket-server-template-llyq.onrender.com'); // Adjust URL to your WebSocket server
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

    const sendPrompt = () => {
        const workflow = {
                "4": {
                "inputs": {
                    "ckpt_name": "turbovisionxlSuperFastXLBasedOnNew_tvxlV431Bakedvae.safetensors"
                },
                "class_type": "CheckpointLoaderSimple",
                "_meta": {
                    "title": "Load Checkpoint"
                }
                },
                "6": {
                "inputs": {
                    "text": text,
                    "clip": [
                    "10",
                    0
                    ]
                },
                "class_type": "CLIPTextEncode",
                "_meta": {
                    "title": "CLIP Text Encode (Prompt)"
                }
                },
                "7": {
                "inputs": {
                    "text": "(people, person, man, woman, human, hands, limbs, child:1.2, worst quality, low quality:1.4)",
                    "clip": [
                    "10",
                    0
                    ]
                },
                "class_type": "CLIPTextEncode",
                "_meta": {
                    "title": "CLIP Text Encode (Prompt)"
                }
                },
                "8": {
                "inputs": {
                    "samples": [
                    "49",
                    0
                    ],
                    "vae": [
                    "4",
                    2
                    ]
                },
                "class_type": "VAEDecode",
                "_meta": {
                    "title": "VAE Decode"
                }
                },
                "10": {
                "inputs": {
                    "stop_at_clip_layer": -2,
                    "clip": [
                    "4",
                    1
                    ]
                },
                "class_type": "CLIPSetLastLayer",
                "_meta": {
                    "title": "CLIP Set Last Layer"
                }
                },
                "11": {
                "inputs": {
                    "vae_name": "kl-f8-anime2.ckpt"
                },
                "class_type": "VAELoader",
                "_meta": {
                    "title": "Load VAE"
                }
                },
                "35": {
                "inputs": {
                    "images": [
                    "8",
                    0
                    ]
                },
                "class_type": "PreviewImage",
                "_meta": {
                    "title": "Preview Image"
                }
                },
                "49": {
                "inputs": {
                    "seed": 1118921082858764,
                    "steps": 3,
                    "cfg": 1.6,
                    "sampler_name": "dpmpp_sde",
                    "scheduler": "karras",
                    "denoise": 0.58,
                    "model": [
                    "56",
                    0
                    ],
                    "positive": [
                    "6",
                    0
                    ],
                    "negative": [
                    "7",
                    0
                    ],
                    "latent_image": [
                    "54",
                    0
                    ]
                },
                "class_type": "KSampler",
                "_meta": {
                    "title": "KSampler"
                }
                },
                "53": {
                "inputs": {
                    "image_path": "C:\\Users\\hello\\code\\webcam_output\\capture.jpg"
                },
                "class_type": "LoadWebcamImage",
                "_meta": {
                    "title": "Load Webcam Image"
                }
                },
                "54": {
                "inputs": {
                    "pixels": [
                    "53",
                    0
                    ],
                    "vae": [
                    "4",
                    2
                    ]
                },
                "class_type": "VAEEncode",
                "_meta": {
                    "title": "VAE Encode"
                }
                },
                "56": {
                "inputs": {
                    "sampling": "lcm",
                    "zsnr": false,
                    "model": [
                    "4",
                    0
                    ]
                },
                "class_type": "ModelSamplingDiscrete",
                "_meta": {
                    "title": "ModelSamplingDiscrete"
                }
                }
            }

        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(text));
            console.log('Prompt sent' + text);
        } else {
            console.error('WebSocket is not connected.');
        }
    };

    return (
        <div className='flex items-center justify-center h-screen'>
        <div className='p-3 flex items-center justify-center flex-col md:flex-row  md:bg-white rounded-lg drop-shadow-xl'>
                <textarea
                    id="textInput"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className='flex-1 w-[85vw] md:w-[45vw] p-5 md:p-1 mx-2 mb-5 md:mb-0 rounded-lg h-[3vh]'
                />
        <div>
            <button onClick={sendPrompt} className='px-5 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-full flex items-center'><BsStars className='mr-2' /> Generate</button>
        </div>
        </div>
        </div>
    );
}