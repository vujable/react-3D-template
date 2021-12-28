import React, { Suspense } from 'react';
import { a as animated3 } from 'react-spring/three';
import { Canvas } from 'react-three-fiber';

import { Background } from 'components/3D/Background';
import { Laptop } from 'components/3D/Laptop';
import { Effects } from 'components/3D/Effects';

function Scene(props) {
    return (
        <Canvas pixelRatio={window.devicePixelRatio || 1} className="canvas" camera={{ fov: 75, position: [0, 0, 0], far: 5000 }}>
            <Suspense fallback={null}>
                <Background />
                <animated3.pointLight position={[-10, 10, -5]} color={props.laptop.open.interpolate([0, 1], ['#f0f0f0', '#c3dce6'])} />
                <directionalLight intensity={0.8} position={[0, 0, 90]} rotation={[41, -1.7, 176]} color="#fff" />
                <Laptop hinge={props.laptop.open.interpolate([0, 1], [1.575, -0.425])} position={[0, 0, -15]} />
            </Suspense>
            <Effects />
        </Canvas>
    );
}

export default Scene;
