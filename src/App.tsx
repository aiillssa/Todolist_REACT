import "./App.css";
import MyCommandBar from "./Header";
import { ThemeProvider } from "@fluentui/react";
import React from "react";
import { myTheme } from "./assets/theme";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { NewTask } from "./routes/newTask";
import { NewPage } from "./routes/newPage";
import { Details } from "./routes/details";
import Main from "./routes/main";

//const router = createBrowserRouter([
const router = createHashRouter([
  {
    path: "/",
    element: <Main isChecked={false} deleteID={undefined} />,
  },
  {
    path: "/yay",
    element: <NewPage />,
  },
  {
    path: "/new",
    element: <NewTask />,
  },
  {
    path: "/details/:index",
    element: <Details />,
  },
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
