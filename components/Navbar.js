import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import {IoMdArrowDropdown} from 'react-icons/io'
import { Col } from 'react-bootstrap';

import styles from "../styles/Navbar.module.css";
function NavBar() {
    return (
        <div className={styles.navbarContainer}>
            <Col className={styles.logo}>
                <Image className={styles.logoImage} height={60} width={150} src='/logo.svg'/>
            </Col>
            <Col className={styles.navItem}>
                <div className={styles.links}>
                    <Link href='/' className={styles.link}>CRM</Link>
                    <Link href='/' className={styles.link}>CM</Link>
                </div>
            </Col>
            <Col className={styles.profileButtonColumn}>
                <div className={styles.profileButton}>
                    BookOne test Hotel
                    <span><IoMdArrowDropdown size={25} /></span>
                </div>
            </Col>
        </div>
    );
}

export default NavBar;