'use client'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Text, Environment, useGLTF, FaceLandmarker, FaceControls, Hud } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing, geometry } from 'maath'
import Inner from './components/Layout/Inner'
import Logo from './components/Logo'
import Stairs from './components/Layout/Stairs'

extend(geometry);

export default function Coke() {
    const internalCamera = useRef(); 
    useGLTF.preload('coke-portal-low.glb');

    return (
        <Stairs>
            <Logo/>
            <Canvas camera={{ fov: 75, position: [0, 0, 20] }}>
                <color attach="background" args={['#f0f0f0']} />
                <Frame id="02" name="hoka" author="Joe Albin-Clark" bg="#E7000C" position={[0, 0, 0]}>
                    <Hud>
                    <Gltf src="coke-portal-low.glb" position={[0, 0, -10]} />
                    <directionalLight position={[0, 5, -4]} intensity={4} />
                    <directionalLight position={[0, -15, -0]} intensity={4} color="#D3ECFF" />
                    <ambientLight intensity={2} color="#FFFFFF" />
                    </Hud>
                </Frame>
                <Rig/>
            </Canvas>
        </Stairs>
    );
}

// Adjusted Frame component to include internal camera
function Frame({ id, name, author, bg, width = 1, height = 2, children, ...props }) {
    const portal = useRef();
    const internalCamera = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
    const [, setLocation] = useLocation();
    const [, params] = useRoute('/item/:id');
    const [hovered, hover] = useState(false);
    useCursor(hovered);

    useEffect(() => {
        if (internalCamera.current) {
            console.log(internalCamera.current.rotation);
        }
    }, []);

    return (
        <group {...props}>
            <mesh
                name={id}
                onDoubleClick={(e) => (e.stopPropagation(), setLocation('/item/' + e.object.name))}
                onPointerOver={(e) => hover(true)}
                onPointerOut={() => hover(false)}
            >
                <roundedPlaneGeometry args={[width, height, 0.05]} />
                <MeshPortalMaterial ref={portal} events={params?.id === id} side={THREE.DoubleSide}>
                    <color attach="background" args={[bg]} />
                            {children}
                </MeshPortalMaterial>
            </mesh>
        </group>
    );
}

function Rig({ position = new THREE.Vector3(0, 0, 2), focus = new THREE.Vector3(0, 0, 0) }) {
    const { controls, scene } = useThree()
    const [, params] = useRoute('/item/:id')

    console.log(controls)
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
