import React from "react";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { Form } from "react-bootstrap";

import { useState } from "react";
import { Button, CardContent, Card, Grid } from "@mui/material";
const Login = () => {
  return (
    <div className={styles.bgimage}>
      <div className={styles.bigContainer}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.leftContainer}>
              <img
                className={styles.logoImage}
                src="https://app.bookonelocal.in/assets/images/sortlogo/Logo_Bookone.png"
                alt=""
              />
              <div className={styles.extraButtons}>
                <img
                  className={styles.extraButtonImg}
                  src="https://app.bookonelocal.in/assets/images/playdownload.png"
                  alt=""
                />
                <img
                  className={styles.extraButtonImg}
                  src="https://app.bookonelocal.in/assets/images/appdownload.png"
                  alt=""
                />
              </div>
            </div>
            <div className={styles.rightContainer}>
              <form className={styles.form}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <div className={styles.buttonContainer}>
                  <button className={styles.submitbutton}>Sign in</button>
                  <button className={styles.submitbutton}>
                    Register Your Business
                  </button>
                  <h3 className={styles.forgot}>Forgot password</h3>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

{
  /* <div className={styles.bgimage}>
  <div className={styles.cardContainer}>
    <div className={styles.imageContainer}>
      {/* <img
              className={styles.image}
              src="https://app.bookonelocal.in/assets/images/sortlogo/Logo_Bookone.png"
              alt=""
            /> */
}
// </div>
//     <div className={styles.card}>
//       <div className={styles.leftContainer}>
//         <h2>Logo</h2>
//         <div>
//           <h3>Google</h3>
//           <h4>Apple</h4>
//         </div>
//       </div>
//       <div className={styles.rightContainer}>All Data</div>
//     </div>
//   </div>
// </div>; */}
