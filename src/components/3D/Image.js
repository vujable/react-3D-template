import React, {  useMemo, useState } from 'react';
import { useSpring, animated, config } from 'react-spring/three';
import * as THREE from 'three/src/Three';
import { HoverImageShader } from '../resources/index';

export function Image({ url, opacity, ...props }) {
    const [hovered, setHover] = useState(false);
    const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);

    const { hoverValue } = useSpring({
        hoverValue: hovered ? 1 : 0,
        config: config.molasses
    });

    return (
        <animated.mesh
            onPointerOver={(e) => {
                setHover(true);
            }}
            onPointerOut={(e) => setHover(false)}
            {...props}>
            <planeBufferGeometry attach="geometry" args={[3, 3 / (props.ratio ? props.ratio : 1)]} />
            <animated.shaderMaterial
                attach="material"
                transparent
                args={[HoverImageShader]}
                uniforms-txt-value={texture}
                uniforms-hover-value={hoverValue}
                uniforms-opacity-value={opacity}
            />
        </animated.mesh>
    );
}
