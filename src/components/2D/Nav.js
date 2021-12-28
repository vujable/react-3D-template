import React, { useState } from 'react';
import { Social } from './Social';

export const Nav = (props) => {
    return (
        <div className="nav-links">
            <span className="link" id="aboutMe" onClick={() => props.goToSection('aboutMe', true)}>
                Home
            </span>
            <span className="link get-in-touch" id="footer" onClick={() => props.goToSection('footer')}>
                Contact Me
            </span>
        </div>
    );
};
export const MobileNav = (props) => {
    const [open, setOpen] = useState(props.open);
    return (
        <React.Fragment>
            <div id="nav-icon1" className={`mobile-nav-button ${open === true ? 'open' : ''}`} onClick={() => setOpen(!open)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={`mobile-nav ${open === true ? 'open' : ''}`}>
                <div className="mobile-nav-container">
                    <span
                        id="aboutMe"
                        onClick={() => {
                            setOpen(false);
                            props.goToSection('aboutMe', true);
                        }}>
                        Home
                    </span>
                    <span
                        id="footer"
                        class="get-in-touch-mobile"
                        onClick={() => {
                            setOpen(false);
                            props.goToSection('footer');
                        }}>
                        Contact Me
                    </span>
                </div>
                <div className="mobile-nav-footer">
                    <Social mobile />
                    <div className="mobile-copyright">© 2021 vujable</div>
                </div>
            </div>
        </React.Fragment>
    );
};
