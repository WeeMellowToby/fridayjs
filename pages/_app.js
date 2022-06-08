import '../styles/globals.css'
import 'regenerator-runtime/runtime'
import UserContext from '../components/UserContext';
import React from 'react';
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
