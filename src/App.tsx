import "./index.css";
import MyCommandBar from "./Header";
import { ThemeProvider } from "@fluentui/react";
import React, { useState } from "react";
import { myTheme } from "./assets/theme";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { NewTask } from "./routes/newTask";
import { Details } from "./routes/details";
import Main from "./routes/main";
// import { PageLayout } from './components/PageLayout';
import { loginRequest } from './authConfig';
import { callMsGraph } from './graph';
import { ProfileData } from './routes/profile';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Button } from "react-bootstrap";


//const router = createBrowserRouter([

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
      // Silently acquires an access token which is then attached to a request for MS Graph data
      instance
          .acquireTokenSilent({
              ...loginRequest,
              account: accounts[0],
          })
          .then((response) => {
              callMsGraph(response.accessToken).then((response) => setGraphData(response));
          });
  }

  return (
      <>
          <h5 className="card-title">Welcome {accounts[0].name}</h5>
          <br/>
          {graphData ? (
              <ProfileData graphData={graphData} />
          ) : (
              <Button variant="secondary" onClick={RequestProfileData}>
                  Request Profile Information
              </Button>
          )}
      </>
  );
};

const MainContent = () => {
  return (
      <div className="App">
          <AuthenticatedTemplate>
              <ProfileContent />
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
              <h5>
                  <center>
                      Please sign-in to see your profile information.
                  </center>
              </h5>
          </UnauthenticatedTemplate>
      </div>
  );
};
const router = createHashRouter([
  {
    path: "/",
    element: <Main isChecked={false} deleteID={undefined} />,
  },
  {
    path: "/new",
    element: <NewTask />,
  },
  {
    path: "/details/:index",
    element: <Details />,
  },{
    path: "/profile",
    element: <ProfileContent/>
  }
]);

export default function App() {
  return (
    <>
      <ThemeProvider theme={myTheme}>
        <MyCommandBar />

        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}
