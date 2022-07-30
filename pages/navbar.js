import Container from 'react-bootstrap/Container';
import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import styles from "../styles/Navbar.module.css";
function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ paddingLeft: "35px", paddingRight: "35px" }}>
            <Navbar.Brand href="#" className={styles.navBrand}><b>Channel Manager</b></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/property/237" style={{ fontSize: "12px",marginTop:"5px" }}>AGODA</Nav.Link>
                    <Nav.Link href="/property/495" style={{ fontSize: "12px",marginTop:"5px" }}>BOOKING.COM</Nav.Link>
                    <Nav.Link href="/property/368" style={{ fontSize: "12px",marginTop:"5px" }}>EXPEDIA</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;