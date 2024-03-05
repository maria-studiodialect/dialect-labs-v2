'use client'
import * as THREE from 'three'
import { Suspense, useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { Preload, ScrollControls, PresentationControls, Scroll, useScroll, Environment, Image as ImageImpl, MeshStandardMaterial, Gltf, useCursor, MeshPortalMaterial, CameraControls} from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing, geometry } from 'maath'
import Inner from './components/Layout/Inner'
import Logo from './components/Logo'

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


function Images() {
    const { width, height } = useThree((state) => state.viewport)
    const data = useScroll()
    const group = useRef()
    useFrame(() => {
        group.current.children[0].material
        group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3
        group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 3
        group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2
        group.current.children[4].material
        group.current.children[5].material
        group.current.children[6].material.zoom = 1 + (1 - data.range(2 / 3, 1 / 3)) / 3
    })
    return (
        <group ref={group}>
            <PresentationControls snap global zoom={0.8} polar={[0, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
            <Frame id="02" name="tea" author="Joe Albin-Clark" bg="#D3ECFF" position={[-3, 0.7, 0]} width={4} height={4} rounded={0.1}>
                <Gltf src="hoka23-portal.glb" receiveShadow castShadow position={[0, -2, -5]} />
                <directionalLight position={[0, 5, -4]} intensity={4} />
                <directionalLight position={[0, -15, -0]} intensity={4} color="#D3ECFF" />
                <ambientLight intensity={2} color="#FFFFFF" />
            </Frame>
            </PresentationControls>
            <Image position={[2.5, 0, 0]} scale={[5, height, 1]} url="/hoka-img.jpg" radius={0.04} />
            <Image position={[-2.3, -height, 2]} scale={[1, 3, 1]} url="/gatezero-4.png" radius={0.04} />
            <Image position={[-0.6, -height, 3]} scale={[1, 2, 1]} url="/gatezero-1.png" radius={0.04} />
            <PresentationControls snap global zoom={0.8} polar={[0, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
            <Frame id="01" name={`pick\nles`} author="Joe Albin-Clark" bg="#E7000C" position={[0.75, -height, 3.5]} width={1.5} height={1.5} rounded={0.03}>
                <Gltf src="coke-portal-low.glb" position={[0, 0, -5]} />
            </Frame>
            </PresentationControls>

            <PresentationControls snap global zoom={0.8} polar={[0, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
                <Frame id="03" name="still" author="Omar Faruq Tawsif" bg="#d1d1ca" position={[0, -height * 1.5, 2.5]} height={2.5} rounded={0.05}>
                    <Gltf src="nike-portal-high.glb" receiveShadow castShadow  scale={0.4} position={[0, -0.4, -2]}  />
                    <Environment files="/adamsbridge.hdr"  />
                    <directionalLight position={[0, 5, -4]} intensity={4} />
                    <ambientLight intensity={0.5} color="#FFFFFF" />
                </Frame>
            </PresentationControls>

            <Image position={[0, -height * 2 - height / 8, 0]} scale={[width, height, 1]} url="/nike.png" />
        </group>
    )
}
export default function PortalsScroll() {
    return (
        <>     
        <Inner>
        <Logo/>
        <div className='h-[100vh]'>
        <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <color attach="background" args={['#e8ebec']} />
        <Suspense fallback={null}>
            <ScrollControls damping={0.5} pages={3}>
            <Scroll>
                <Images />
                <directionalLight position={[0, 5, -4]} intensity={4} />
                <directionalLight position={[0, -15, -0]} intensity={4} color="#D3ECFF" />
                <ambientLight intensity={2} color="#FFFFFF" />
            </Scroll>
            
            <Scroll html className='w-full'>
                <div className='font-monumentGrotesk absolute top-[89vh] left-[1vw] text-8xl'>HOKA UTMB</div>
                <div className='font-monumentGrotesk absolute top-[140vh] left-[56vw] text-8xl'>TAKE A TASTE</div>
                <div className='font-monumentGrotesk absolute top-[198.5vh] left-[2vw] w-full text-8xl uppercase'>Nike AIR</div>
                <div className='font-monumentGrotesk absolute top-[198.5vh] left-[73vw] w-full text-8xl uppercase'>MAX Day</div>
            </Scroll>
            
            </ScrollControls>
            <Preload />
        </Suspense>
        </Canvas>
        </div>
        </Inner>
        </>
    )
}

function Rig({ position = new THREE.Vector3(0, 0, 2), focus = new THREE.Vector3(0, 0, 0) }) {
    const { controls, scene } = useThree()
    const [, params] = useRoute('/item/:id')
    useEffect(() => {
        const active = scene.getObjectByName(params?.id)
        if (active) {
        active.parent.localToWorld(position.set(0, 0.5, 0.25))
        active.parent.localToWorld(focus.set(0, 0, -2))
        }
        controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
    })
    return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
}
