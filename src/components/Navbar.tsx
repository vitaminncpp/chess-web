import React from "react";
import '../styles/navbar.scss';

const Navbar = () => {
    return (
        <div className={'navbar'}>
            <ul className="nav-menu">
                <li className="nav-item"><a href="/home" className="nav-link">Home</a></li>
                <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
                <li className="nav-item"><a href="/profile" className="nav-link">Profile</a></li>
                <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
                <li className="nav-item"><a href="/services" className="nav-link">Services</a></li>
            </ul>
        </div>
    );
}

export default Navbar;