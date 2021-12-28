import React, { useMemo } from 'react';
import { useThree } from 'react-three-fiber';
import { a } from 'react-spring/three';

export const Text = ({ children, position, scale, opacity, color, fontSize = 410 }) => {
    const {
        size: { width, height }
    } = useThree();

    const canvas = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 2048;
        const context = canvas.getContext('2d');
        context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'white';
        context.fillText(children, 1024, 1024 - 410 / 2);
        return canvas;
    }, [children, width, height]);
    return (
        <a.sprite scale={scale} position={position} castShadow>
            <a.spriteMaterial attach="material" transparent opacity={opacity} color={color}>
                <canvasTexture attach="map" image={canvas} premultiplyAlpha />
            </a.spriteMaterial>
        </a.sprite>
    );
};
