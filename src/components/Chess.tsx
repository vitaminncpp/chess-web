import {Component} from "react";
import Chessboard from "./Chessboard";
import {ChessGame, initialPosition} from "../chess/Chess";

export class Chess extends Component {

    game: ChessGame;

    constructor(props: {}) {
        super(props);
        this.game = new ChessGame({position: initialPosition, turn: true});
    }

    render() {
        return (
            <div className="chess">
                <Chessboard/>
            </div>
        );
    }
}