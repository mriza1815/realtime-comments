import React from "react";
import App from "next/app";
import { ToastProvider } from 'react-toast-notifications'
import {wrapper} from "../redux/store";
import Header from "../components/Header";

import './custom.css'

class WrappedApp extends App {

  render() {
    const { Component, pageProps, router } = this.props
    return (
      <ToastProvider autoDismiss autoDismissTimeout={3000}>
        <div>
          <Header/>
          <div style={{top: 50, position: "relative"}}>
            <Component {...pageProps} {...router} />
          </div>
        </div>
      </ToastProvider>
    )
  }
}


export default wrapper.withRedux(WrappedApp);
