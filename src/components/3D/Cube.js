import React from 'react';

export const Cube = (props) => {
    
    return (
        <mesh position={props.position}>
            {[...Array(6)].map((_, index) => (
                <meshBasicMaterial attachArray="material" key={index} color={'red'} />
            ))}
            <boxGeometry args={[.5, 5, .5]} />
        </mesh>
    );
};
