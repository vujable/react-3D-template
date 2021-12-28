import React from 'react';
import { useSpring as useSpring3 } from 'react-spring/three';

import { useLaptop } from 'components/3D/Laptop';

import Scene from './Scene';

export default function App() {
    const openLaptop = useLaptop((state) => state.setOpen);

    const [laptop, setLaptop] = useSpring3(() => ({
        open: 0
    }));

    const onMainClick = (e) => {
        const open = laptop.open.value === 1 ? 0 : 1;
        setLaptop({
            open
        });
        openLaptop(open === 1);
    };

    return (
        <React.Fragment>
            <Scene laptop={laptop} />
            <div className="main-scene" onClick={onMainClick}>
                <h1>hello</h1>
            </div>
        </React.Fragment>
    );
}
