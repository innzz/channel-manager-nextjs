import '../styles/globals.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import {SSRProvider} from '@react-aria/ssr'; 
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [showTravelAgencyName, setShowTravelAgencyName] = useState({});
  return(
    <>
      <SSRProvider>
      {/* <NavBar /> */}
      <Component {...pageProps} showTravelAgencyName={showTravelAgencyName} setShowTravelAgencyName={setShowTravelAgencyName}/>
      </SSRProvider>
    </>
    )
}

export default MyApp
