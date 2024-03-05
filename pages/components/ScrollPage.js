'use client'
import * as THREE from 'three'
import { Suspense, useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload, ScrollControls, Scroll, useScroll, Image as ImageImpl, MeshStandardMaterial } from '@react-three/drei'

const useVideoTexture = (url) => {
    // Initialize the texture as undefined
    const [texture, setTexture] = useState(undefined);

    useEffect(() => {
        if (url.endsWith('.mp4') || url.endsWith('.webm')) {
            const video = document.createElement('video');
            video.src = url;
            video.crossOrigin = 'anonymous';
            video.loop = true;
            video.muted = true;
            video.autoplay = true;
            video.play();

            const videoTexture = new THREE.VideoTexture(video);
            videoTexture.minFilter = THREE.LinearFilter;
            videoTexture.magFilter = THREE.LinearFilter;
            videoTexture.generateMipmaps = false;

            setTexture(videoTexture);

            return () => {
                videoTexture.dispose();
            };
        }
    }, [url]);

    return texture;
};


function Image({ url, c = new THREE.Color(), ...props }) {
    const ref = useRef();
    const [hovered, hover] = useState(false);
    const texture = useVideoTexture(url);

    useFrame(() => {
        if (ref.current) {
            ref.current.material.color.lerp(c.set(hovered ? 'white' : '#ccc'), hovered ? 0.4 : 0.05);
        }
    });

    // For video, use a mesh with a video texture
    if (texture) {
        return (
            <mesh ref={ref} {...props} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial map={texture} />
            </mesh>
        );
    } else {
        // For image, use ImageImpl with the URL
        return (
            <ImageImpl
                ref={ref}
                url={url}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
                {...props}
            />
        );
    }
}



function Images() {
    const { width, height } = useThree((state) => state.viewport)
    const data = useScroll()
    const group = useRef()
    useFrame(() => {
        group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3
        group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3
        group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 3
        group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2
        group.current.children[4].material.zoom = 1 + data.range(1.25 / 3, 1 / 3) / 1
        group.current.children[5].material.zoom = 1 + data.range(1.8 / 3, 1 / 1) / 3
        group.current.children[6].material.zoom = 1 + (1 - data.range(2 / 3, 1 / 3)) / 3
    })
    return (
        <group ref={group}>
            <Image position={[-2.5, 0, 0]} scale={[5, height, 1]} url="/google-portrait.png" />
            <Image position={[2.5, 0, 1]} scale={[4, 3, 1]} url="/google-ooh.png" />
            <Image position={[-2.3, -height, 2]} scale={[1, 3, 1]} url="/gatezero-4.png" />
            <Image position={[-0.6, -height, 3]} scale={[1, 2, 1]} url="/gatezero-1.png" />
            <Image position={[0.75, -height, 3.5]} scale={1.5} url="/gatezero-2.png" />
            <Image position={[0, -height * 1.5, 2.5]} scale={[3.5, 2, 1]} url="/nike.png" />
            <Image position={[0, -height * 2 - height / 4, 0]} scale={[width, height, 1]} url="/particles.png" />
        </group>
    )
}
export default function ScrollPage() {
    return (
        <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
            <ScrollControls damping={0.5} pages={3}>
            <Scroll>
                <Images />
            </Scroll>
            {/* 
            <Scroll html>
                <h1 style={{ position: 'absolute', top: '60vh', left: '0.5em' }}>We</h1>
                <h1 style={{ position: 'absolute', top: '120vh', left: '60vw' }}>are</h1>
                <h1 style={{ position: 'absolute', top: '198.5vh', left: '0.5vw', fontSize: '40vw' }}>DIALECT</h1>
            </Scroll>
            */}
            </ScrollControls>
            <Preload />
        </Suspense>
        </Canvas>
    )
}
