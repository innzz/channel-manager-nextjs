import React from "react";
import styles from "../../styles/Login.module.css";
// import Link from "next/link";
import { Alert, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";
// import { Button, CardContent, Card, Grid } from "@mui/material";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [radio, setRadio] = useState("");
  //   const token = localStorage.get("token");
  //   console.log(token);
  const router = useRouter();
  //   console.log(router);
  const signIn = (e) => {
    console.log(radio)
    e.preventDefault();
    fetch("https://api.bookonelocal.in/api-bookone/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        APP_ID: "BOOKONE_WEB_APP",
      },
      body: JSON.stringify({
        password: password,
        username: email,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.token) {
          const propertyId = resJson.property.id;
          // router.push(`/siteminder/${resJson.property.id}`);
          // router.push(`/newDesign/${resJson.property.id}`);
          localStorage.setItem("token", resJson.token);
          fetch(
            `https://api.bookonelocal.in/channel-integration/api/channelManager/property/${resJson.property.id}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${resJson.token}`,
                "Content-Type": "application/json",
                APP_ID: "BOOKONE_WEB_APP",
              },
            }
          )
            .then((res) => res.json())
            .then((resJson) => {
              if(radio === "crs"){
                router.push(`/crs/${resJson.bookonePropertyId}`);
              } else if (radio === "cm"){
                router.push(`/onlinetravelagencies/Agoda/${resJson.bookonePropertyId}`);
              }
              //   console.log(resJson.propertiesOnlineTravelAgencies);
              //   for (
              //     let i = 0;
              //     i < resJson.propertiesOnlineTravelAgencies.length;
              //     i++
              //   ) {
              //     // if (resJson.propertiesOnlineTravelAgencies[i].onlineTravelAgencyName === 'Agoda') {
              //     //     router.push(`/onlinetravelagencies/AgodaId/${propertyId}`);
              //     // }
              //     if (
              //       resJson.propertiesOnlineTravelAgencies[i]
              //         .onlineTravelAgencyName === "Agoda"
              //     ) {
              //       router.push(`/onlinetravelagencies/Agoda/${propertyId}`);
              //     } else if (
              //       resJson.propertiesOnlineTravelAgencies[i]
              //         .onlineTravelAgencyName === "SiteMinder"
              //     ) {
              //       router.push(`/onlinetravelagencies/Siteminder/${propertyId}`);
              //     } else if (
              //       resJson.propertiesOnlineTravelAgencies[i]
              //         .onlineTravelAgencyName === "MakeMyTrip"
              //     ) {
              //       router.push(`/onlinetravelagencies/MakeMyTrip/${propertyId}`);
              //     } else {
              //       console.log("No id matched with any Ota");
              //     }
              //   }
            });
        } else {
          setAlert(true);
        }
      });
  };
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
                  <Form.Control
                    value={email}
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className="flex gap-3 ml-1">
                  <div className="flex gap-1"> 
                    <input type="radio" onClick={()=>setRadio("crs")} />
                      <label>CRS</label>
                  </div>
                  <div className="flex gap-1"> 
                    <input type="radio" onClick={()=>setRadio("cm")} />
                      <label>CM</label>
                  </div>
                  <div className="flex gap-1"> 
                    <input type="radio" onClick={()=>setRadio("eglobe")} />
                      <label>EGlobe</label>
                  </div>
                </div>
                <div className={styles.buttonContainer}>
                  <button className={styles.submitbutton} onClick={signIn}>
                    Sign in
                  </button>
                  <button className={styles.submitbutton}>
                    Register Your Business
                  </button>
                  <Alert
                    show={alert}
                    variant="danger"
                    onClose={() => setAlert(false)}
                    dismissible
                  >
                    <p>Email Id or Password is incorrect</p>
                  </Alert>
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
