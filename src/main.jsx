import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

//Specify HTML root

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MsalProvider instance = {msalInstance}>
    <App />
    </MsalProvider>
  </React.StrictMode>
);
