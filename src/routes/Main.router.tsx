import {createBrowserRouter} from "react-router-dom";
import {Chess} from "../components/Chess";
import React from "react";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Chess/>
  },
  {
    path: "/k",
    element: <div>About</div>,
  }, {
    path: "/linux",
    element: <div>About</div>,
  }, {
    path: "/linux",
    element: <div>About</div>,
  }, {
    path: "/linux",
    element: <div>About</div>,
  },
]);


export default router;