'use client'
import * as THREE from 'three'
import { Suspense, useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { Preload, ScrollControls, PresentationControls, Scroll, useScroll, Environment, Image as ImageImpl, MeshStandardMaterial, Gltf, useCursor, MeshPortalMaterial, CameraControls} from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing, geometry } from 'maath'

extend(geometry)

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

function Frame({ id, name, author, bg, width = 4, height = 4, rounded,  children, ...props }) {
    const portal = useRef()
    const [, setLocation] = useLocation()
    const [, params] = useRoute('/item/:id')
    const [hovered, hover] = useState(false)
    useCursor(hovered)
    useFrame((state, dt) => easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt))

    return (
        <group {...props}>
        <mesh name={id} onDoubleClick={(e) => (e.stopPropagation(), setLocation('/item/' + e.object.name))} onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
            <roundedPlaneGeometry args={[width, height, rounded]} />
            <MeshPortalMaterial ref={portal} events={params?.id === id} side={THREE.DoubleSide}>
            <color attach="background" args={[bg]} />
            {children}
            </MeshPortalMaterial>
        </mesh>
        </group>
    )
}

function Image({ url, c = new THREE.Color(), radius, ...props }) {
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
                radius={radius}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
                {...props}
            />
        );
    }
}

function Rig() {
    const { camera, mouse } = useThree()
    const vec = new THREE.Vector3()
    
        return useFrame(() => {
        camera.position.lerp(vec.set(mouse.x, mouse.y, camera.position.z), 0.05)
        camera.lookAt(0, 0, 0)
        })
}

function Content({model, bgColour}) {
    const { width, height } = useThree((state) => state.viewport)
    const data = useScroll()
    const group = useRef()
    useFrame(() => {
        group.current.children[0].material
    })
    return (
        <group ref={group}>
            <PresentationControls snap global zoom={0.8} polar={[0, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
            <Frame id="02" name="tea" author="Joe Albin-Clark" bg={bgColour} position={[0, 0.25, 0]} width={width - 0.5} height={height - 1} rounded={0.1}>
                <Gltf src={model} receiveShadow castShadow position={[0, -1, -5]} />
                <directionalLight position={[0, 5, -4]} intensity={4} />
                <directionalLight position={[0, -15, -0]} intensity={4} color="#D3ECFF" />
                <ambientLight intensity={2} color="#FFFFFF" />
            </Frame>
            </PresentationControls>
        </group>
    )
}


export default function ProjectPage({model, bgColour, title, year}) {
    return (
        <>     
        <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <color attach="background" args={['#e8ebec']} />
        <Suspense fallback={null}>
            <ScrollControls damping={0.5} pages={3}>
            <Scroll>
                <Content model={model} bgColour={bgColour} />
                <directionalLight position={[0, 5, -4]} intensity={4} />
                <directionalLight position={[0, -15, -0]} intensity={4} color="#D3ECFF" />
                <ambientLight intensity={2} color="#FFFFFF" />
                <Rig/>
            </Scroll>
        
            
            <Scroll html className='w-full'>
                <div className='font-monumentGrotesk absolute top-[91.5vh] left-[1.8vw] text-7xl uppercase'>{title}</div>
                <div className='font-monumentGrotesk absolute top-[91.5vh] right-[1vw] text-7xl'>{year}</div>
                <div className='font-monumentGrotesk absolute top-[140vh] left-[56vw] text-8xl'>TAKE A TASTE</div>
                <div className='font-monumentGrotesk absolute top-[198.5vh] left-[2vw] w-full text-8xl uppercase'>TEXT 1</div>
                <div className='font-monumentGrotesk absolute top-[198.5vh] left-[73vw] w-full text-8xl uppercase'>text 2</div>
            </Scroll>

            </ScrollControls>
            <Preload />
        </Suspense>
        </Canvas>
        </>
    )
}