'use client'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Text, Environment, useGLTF } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing, geometry } from 'maath'
import Inner from './components/Layout/Inner'
import Logo from './components/Logo'

extend(geometry)


export default function Portals() {
    useGLTF.preload('hoka23-portal.glb');
    useGLTF.preload('coke-portal-low.glb');
    useGLTF.preload('nike-portal.glb');

    return (
    <Inner>
    <Logo/>
    <Canvas camera={{ fov: 75, position: [0, 0, 20] }}>
        <color attach="background" args={['#f0f0f0']} />
        {/* Row 1 */}
        <Frame id="01" name='tat' author="Joe Albin-Clark" bg="#E7000C" position={[-1.2, 0, 0]} rotation={[0, 0.5, 0]}>
            <Gltf src="coke-portal-low.glb" position={[0, 0, -10]} />
        </Frame>
        <Frame id="02" name="hoka" author="Joe Albin-Clark" bg="#D3ECFF" position={[0, 0, 0]}>
        <Gltf src="hoka23-portal.glb" receiveShadow castShadow position={[0, -2, -4]} />
        <directionalLight position={[0, 5, -4]} intensity={4} />
        <directionalLight position={[0, -15, -0]} intensity={4} color="#D3ECFF" />

        <ambientLight intensity={2} color="#FFFFFF" />

        </Frame>
    
        <Frame id="03" name="nike" author="Joe Albin-Clark" bg="#d1d1ca" position={[1.2, 0, 0]} rotation={[0, -0.5, 0]}>
            <Gltf src="nike-portal.glb" receiveShadow castShadow  scale={0.4} position={[0, -0.4, -4]}  />
            <Environment files="/adamsbridge.hdr"  />
            <directionalLight position={[0, 5, -4]} intensity={4} />
            <ambientLight intensity={0.5} color="#FFFFFF" />
        </Frame>
        <Rig /> 
    </Canvas>
    </Inner>
    );
}

function BackArrow() {
    const [, setLocation] = useLocation();

    const goBack = () => {
        // Navigate back to the main view or a predefined route
        setLocation('/');
    };

    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            cursor: 'pointer',
            zIndex: 100, // Ensure it's above other canvas elements
            // Add more styles as needed
        }} onClick={goBack}>
            {/* Here you can use an SVG or any icon for the back arrow */}
            ← Back
        </div>
    );
}

function Frame({ id, name, author, bg, width = 1, height = 2, children, ...props }) {
    const portal = useRef()
    const [, setLocation] = useLocation()
    const [, params] = useRoute('/item/:id')
    const [hovered, hover] = useState(false)
    useCursor(hovered)
    useFrame((state, dt) => easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt))
    return (
        <group {...props}>
        <mesh name={id} onDoubleClick={(e) => (e.stopPropagation(), setLocation('/item/' + e.object.name))} onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
            <roundedPlaneGeometry args={[width, height, 0.1]} />
            <MeshPortalMaterial ref={portal} events={params?.id === id} side={THREE.DoubleSide}>
            <color attach="background" args={[bg]} />
            {children}
            </MeshPortalMaterial>
        </mesh>
        </group>
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
