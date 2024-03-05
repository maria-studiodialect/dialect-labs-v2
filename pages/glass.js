import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Float, Lightformer, Text3D, Html, Center, ContactShadows, Environment, MeshTransmissionMaterial } from "@react-three/drei"
import { EffectComposer, N8AO, TiltShift2 } from "@react-three/postprocessing"
import { easing } from "maath"
import { useState, useEffect, Suspense } from "react";
import localFont from 'next/font/local'
import dynamic from 'next/dynamic';
import Inner from "./components/Layout/Inner"
import Logo from "./components/Logo"
import Stairs from "./components/Layout/Stairs"

THREE.ColorManagement.legacyMode = false

export default function Glass() {
        return (
            <>
            <Stairs>
                <Logo/>
                <Canvas shadows camera={{ position: [0, 0, 20], fov: 50 }} >
                    <Scene/>
                </Canvas>
            </Stairs>
            </>
        );
}
function Scene() {
    return (
        <>
            <color attach="background" args={["#e0e0e0"]} />
            <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} />
            <Suspense>
            <Status position={[0, 0, -50]} />
            </Suspense>
            <Float floatIntensity={2}>
            <Chameleon scale={0.7} />
            </Float>
            <ContactShadows scale={100} position={[0, -10.5, 0]} blur={1} far={100} opacity={0.85} />
            <Environment preset="city">
            <Lightformer intensity={8} position={[10, 5, 0]} scale={[10, 50, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
            </Environment>
            
            <EffectComposer disableNormalPass>
            <TiltShift2 blur={0.2} />
            </EffectComposer>
            <Rig />
        </>
        )
    }

function Rig() {
    useFrame((state, delta) => {
        easing.damp3(
        state.camera.position,
        [Math.sin(-state.pointer.x) * 5, state.pointer.y * 3.5, 15 + Math.cos(state.pointer.x) * 10],
        0.2,
        delta,
        )
        state.camera.lookAt(0, 0, 0)
    })
}

function Chameleon(props) {
    const { nodes } = useGLTF("/chamlow.glb")
    console.log(nodes)

    // Set the rotation values (in radians)
    const rotationX = 0 // Rotate 90 degrees around the X axis
    const rotationY = Math.PI / 0.6 // No rotation around the Y axis
    const rotationZ = 0 // No rotation around the Z axis

    const positionX = 0 // X position
    const positionY = -4 // Move down by 1 unit on Y axis
    const positionZ = -5 // Z position

    return (
        <mesh
        receiveShadow
        geometry={nodes.cham.geometry}
        castShadow
        position={[positionX, positionY, positionZ]}
        rotation={[rotationX, rotationY, rotationZ]}
        {...props}>
        <MeshTransmissionMaterial transmissionSampler backside backsideThickness={20} thickness={10} chromaticAberration={0.1} />
        </mesh>
    )
}


function Status({ margin = 0.5 }) {
    const { width, height } = useThree((state) => state.viewport)

    return ( 
        <>
        <Center position={[0 , 0, -15]}>
            <Text3D letterSpacing={-0.06} size={7} font="/Inter_Bold.json">
            DIALECT              
            <meshStandardMaterial color="black" />
            </Text3D>
        </Center>
        </>
    )
}
