import {Component} from "react";
import Chessboard from "./Chessboard";

export class Chess extends Component {

    constructor(props: {}) {
        super(props);

    }

    render() {
        return (
            <div className="chess">
                <Chessboard/>
            </div>
        );
    }
}