import React from 'react';
import { EffectComposer, Vignette } from '@react-three/postprocessing';

export const Effects = React.forwardRef((props, ref) => {
    return (
        <EffectComposer multisampling={0}>
            <Vignette />
        </EffectComposer>
    );
});
