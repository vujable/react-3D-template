import * as THREE from 'three';
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from 'react-three-fiber';
import { useGLTF } from '@react-three/drei';
import { a as three } from 'react-spring/three';
import create from 'zustand';

export const useLaptop = create((set) => ({
    open: false,
    setOpen: (e) => set({ open: e })
}));

export function Laptop({ hinge, ...props }) {
    const open = useLaptop((state) => state.open);
    const group = useRef();
    const [hovered, setHovered] = useState(false);
    useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered]);

    const { nodes, materials } = useGLTF('/models/laptop.glb');
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, open ? Math.cos(t / 2) / 8 + 0.25 : 0, 0.1);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, open ? Math.sin(t / 4) / 4 : 0, 0.1);
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, open ? Math.sin(t / 4) / 4 : 0, 0.1);
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, open ? (-2 + Math.sin(t)) / 3 : -4.3, 0.1);
    });
    return (
        <three.group {...props} onPointerOver={(e) => setHovered(true)} onPointerOut={(e) => setHovered(false)} dispose={null}>
            <three.group ref={group}>
                <three.group rotation-x={hinge} open={open} position={[0, -0.04, 0.41]}>
                    <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                        <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
                        <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
                        <mesh material={materials['screen.001']} geometry={nodes['Cube008_2'].geometry} />
                    </group>
                </three.group>
                <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
                <group position={[0, -0.1, 3.39]}>
                    <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
                    <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
                </group>
                <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
            </three.group>
        </three.group>
    );
}
