import React from 'react';
import { useThree } from 'react-three-fiber';
import {  a as animated3 } from 'react-spring/three';

export function Background(props) {
    const { viewport } = useThree();
    return (
        <mesh onBeforeRender={props.onLoad} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry attach="geometry" args={[1, 1]} />
            <animated3.meshBasicMaterial attach="material" color={props.color} depthTest={false} />
        </mesh>
    );
}
