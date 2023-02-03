import React, {FC, useState} from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Chessboard from "./components/Chessboard";

const App: FC<{}> = (props: {}) => {
    return (
        <div className="App">
            <Chessboard/>
        </div>
    );
}

export default App;
