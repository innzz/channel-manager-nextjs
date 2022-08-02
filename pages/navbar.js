import Container from 'react-bootstrap/Container';
import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import NavDropdown from 'react-bootstrap/NavDropdown';

import styles from "../styles/Navbar.module.css";
function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ paddingLeft: "35px", paddingRight: "35px" }}>
            <Navbar.Brand href="#" className={styles.navBrand}><b>Channel Manager</b></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Link href="/property/237" >AGODA</Link>
                    <Link href="/property/495" >BOOKING.COM</Link>
                    <Link href="/property/368" >EXPEDIA</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;