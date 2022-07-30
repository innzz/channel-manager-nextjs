
import React from "react"
import styles from "../styles/Login.module.css";
import Link from "next/link";

import { useState } from 'react';
import { Button, CardContent, Card, Grid } from "@mui/material";
function Login() {
    return (
        <div>
           <div className={styles.bgimage}>
                <div className={styles.card}>
                    <div>
                        <img className={styles.image} src="https://app.bookonelocal.in/assets/images/sortlogo/Logo_Bookone.png" alt="" />
                    </div>
                    <div></div>
                </div>
           </div>
        </div>
    );
}

export default Login;


