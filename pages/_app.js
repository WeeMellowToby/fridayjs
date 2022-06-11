import '../styles/globals.css'
import 'regenerator-runtime/runtime'
import SideBar from '../components/SideBar';
import React from 'react';
function MyApp({ Component, pageProps }) {
  return <>
  <SideBar/>
  <Component {...pageProps} />
  </>
}

export default MyApp
