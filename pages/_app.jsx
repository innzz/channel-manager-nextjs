import "../styles/globals.css";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { SSRProvider } from "@react-aria/ssr";
import { useState } from "react";
import NavBar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  const [showTravelAgencyName, setShowTravelAgencyName] = useState({});
  return (
    <>
      <SSRProvider>
        {/* <NavBar /> */}
        <Component
          {...pageProps}
          showTravelAgencyName={showTravelAgencyName}
          setShowTravelAgencyName={setShowTravelAgencyName}
        />
      </SSRProvider>
    </>
  );
}

export default MyApp;
