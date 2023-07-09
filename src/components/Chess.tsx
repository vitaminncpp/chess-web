import {Component} from "react";
import Chessboard from "./Chessboard";
import {ChessGame, initialPosition} from "../chess/Chess";

export class Chess extends Component {

  protected game: ChessGame;

  constructor(props: {}) {
    super(props);
    this.game = new ChessGame({position: initialPosition, turn: true});
    console.table(this.game.getBoard().getBoard())
  }

  render() {
    return (
      <div className="chess">
        <Chessboard game={this.game}/>
      </div>
    );
  }
}