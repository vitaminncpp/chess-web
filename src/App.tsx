import React, {FC} from "react";
import "./App.scss";
import ChessNavbar from "./components/Navbar";
import { RouterProvider,} from "react-router-dom";
import router from "./routes/Main.router";

const App: FC<{}> = (props: {}) => {
  return (
    <div className="App">
      <ChessNavbar/>
      <RouterProvider router={router}/>
    </div>
  );
};

export default App;
