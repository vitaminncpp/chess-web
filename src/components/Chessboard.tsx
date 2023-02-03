import React, {Component} from "react";
import "../styles/chessboard.scss";
import {ChessPiece} from "./ChessPiece";
import {PieceRep} from "../chess/Piece";
import {initialPosition} from "../chess/Chess";


export default class Chessboard extends Component {
    board: Array<Array<PieceRep>>;
    player: boolean;
    flip: boolean;

    constructor(props: { board: Array<Array<PieceRep>> }) {
        super(props);
        this.state = {count: 0};
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

    public grabPiece(e: React.MouseEvent): void {
        console.log(e.target);
    }

//😇
    public render() {
        return (
            <div className="chessboard">
                <div className="controls">
                    <button id="flip" onClick={this.flipBoard}>Flip the fucking board</button>
                </div>
                <table className="grid">
                    <tbody>
                    {
                        ((this.player && !this.flip) || (!this.player && this.flip)) ? (this.board.map((row, i) => {
                            return <tr key={i}>
                                {row.map((item, j) => {
                                    return <td key={j} className={(i + j) % 2 == 1 ? 'dark-tile' : 'light-tile'}>
                                        <ChessPiece player={item.color} piece={item.piece} i={i} j={j}
                                                    grabPiece={this.grabPiece}/>
                                    </td>;
                                })
                                }
                            </tr>;
                        })) : (this.board.map((row, i) => {
                            return <tr key={i}>
                                {row.map((item, j) => {
                                    return <td key={j} className={(i + j) % 2 == 1 ? 'dark-tile' : 'light-tile'}>
                                        <ChessPiece player={item.color} piece={item.piece} i={i} j={j}
                                                    grabPiece={this.grabPiece}/>
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
}
