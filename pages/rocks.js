'use client'
import * as THREE from "three"
import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, useGLTF } from "@react-three/drei"
import { EffectComposer, N8AO } from "@react-three/postprocessing"
import { BallCollider, Physics, RigidBody, CylinderCollider } from "@react-three/rapier"
import Inner from "./components/Layout/Inner"

THREE.ColorManagement.legacyMode = false
const baubleMaterial = new THREE.MeshLambertMaterial({ color: "#c0a0a0", emissive: "red" })
const capMaterial = new THREE.MeshStandardMaterial({ metalness: 0.75, roughness: 0.15, color: "#8a492f", emissive: "#600000", envMapIntensity: 20 })
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28)
const baubles = [...Array(15)].map(() => ({ scale: [0.025, 0.03, 0.035, 0.02, 0.015][Math.floor(Math.random() * 5)] }))

function Bauble({ vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread }) {
    const { nodes } = useGLTF("/rock1low.glb")
    const api = useRef()

    const newRoughnessValue = 0.8; // Set this to your desired value
    if (nodes.rock1.material) {
        nodes.rock1.material.roughness = newRoughnessValue;
    }

    useFrame((state, delta) => {
        delta = Math.min(0.1, delta)
        const impulseMultiplier = 1000 // Adjust this value as needed
        api.current.applyImpulse(
        vec
            .copy(api.current.translation())
            .normalize()
            .multiply({ x: -impulseMultiplier * delta * scale, y: -impulseMultiplier * delta * scale, z: -impulseMultiplier * delta * scale }),
        )
    })

    console.log(nodes)
    return (
        <RigidBody linearDamping={0.75} angularDamping={0.15} friction={0.2} position={[r(20), r(20) - 25, r(20) - 10]} ref={api} colliders="hull" dispose={null}>
        <mesh castShadow scale={scale} geometry={nodes.rock1.geometry} material={nodes.rock1.material} />
        </RigidBody>
    )
}

function Pointer({ vec = new THREE.Vector3() }) {
    const ref = useRef()
    useFrame(({ mouse, viewport }) => {
        vec.lerp({ x: (mouse.x * viewport.width) / 2, y: (mouse.y * viewport.height) / 2, z: 0 }, 0.2)
        ref.current?.setNextKinematicTranslation(vec)
    })
    return (
        <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
        <BallCollider args={[2]} />
        </RigidBody>
    )
}

export default function Rocks() {
    return (
        <Inner>
        <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 2)}>
            <color attach="background" args={["#EFE7E4"]} />
            <ambientLight intensity={8} color="#D3ECFF" />
            <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="white" castShadow shadow-mapSize={[512, 512]} />
            <directionalLight position={[0, 5, -4]} intensity={8} />
            <directionalLight position={[0, -15, -0]} intensity={4} color="red" />
            <Physics gravity={[0, 0, 0]}>
            <Pointer />
                {baubles.map((props, i) => <Bauble key={i} {...props} />)}
            </Physics>
            <Environment files="/adamsbridge.hdr"  />
            <EffectComposer disableNormalPass>
            <N8AO color="black" aoRadius={2} intensity={1} />
            </EffectComposer>
        </Canvas>
        </Inner>
    );
}
