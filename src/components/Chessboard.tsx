import React, {Component} from "react";
import "../styles/chessboard.scss";
import {ChessPiece} from "./ChessPiece";
import {PieceRep} from "../chess/Piece";
import {ChessGame, initialPosition} from "../chess/Chess";
import $ from "jquery";
import "jqueryui";
import Button from "react-bootstrap/Button";


export default class Chessboard extends Component<{ game: ChessGame }, { count: number }> {
  protected game: ChessGame;
  protected board: Array<Array<PieceRep>>;
  player: boolean;
  flip: boolean;

  constructor(props: { game: ChessGame }) {
    super(props);
    this.state = {count: 0};
    this.game = props.game;
    this.board = initialPosition;
    this.player = true;
    this.flip = false;
    //this bindings
    this.flipBoard = this.flipBoard.bind(this);
  }

  public flipBoard() {
    this.flip = !this.flip;
    this.setState({count: this.state.count + 1});
    console.log("flipBoard");
    console.log(this.state);
  }

  //😇
  public render() {
    return (
      <div className="chessboard">
        <Button variant={"secondary"} onClick={() => {
          this.flip = !this.flip
          this.setState({count: this.state.count + 1});
        }} size={"lg"}>Flip</Button>

        <table className="grid" id="chessgrid">
          <tbody>
          {
            ((this.player && !this.flip) || (!this.player && this.flip)) ? (this.board.map((row, i) => {
              return <tr key={i}>
                {row.map((item, j) => {
                  return <td key={j} className={(i + j) % 2 === 1 ? "dark-tile" : "light-tile"}
                             id={`${i}-${j}`}
                  >
                    <ChessPiece player={item.color} piece={item.piece} i={i} j={j}
                                handleMouseDown={this.handleMouseDown}
                    />
                  </td>;
                })
                }
              </tr>;
            })) : (this.board.map((row, i) => {
              return <tr key={i}>
                {row.map((item, j) => {
                  return <td key={j} className={(i + j) % 2 === 1 ? "dark-tile" : "light-tile"}>
                    <ChessPiece player={item.color} piece={item.piece} i={i} j={j}
                                handleMouseDown={this.handleMouseDown}
                    />
                  </td>;
                }).reverse()
                }
              </tr>;
            }).reverse())
          }
          </tbody>
        </table>
        <div className="test">
          {this.state.count}
        </div>
      </div>
    );
  }

  public componentDidUpdate() {
    this.update();
  }

  public componentDidMount() {
    this.update();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public handleMouseDown(i: number, j: number): void {

  }

  public update() {
    $(".piece").draggable({
      containment: "table.grid#chessgrid",  // constraints the drag to the chessboard only
      // snap:'table.grid#chessgrid td',
      revert: true
    });

    // $('table.grid td').droppable({
    //     drop: (e, ui) => {
    //         e.target.innerHTML = '';
    //         e.target.appendChild(ui.draggable[0]);
    //         ui.draggable.css({top: '0px', left: '0px',});
    //     }
    // });
  }
}
