import React, {Component} from "react";
import "../styles/chessboard.scss";
import {ChessPiece} from "./ChessPiece";
import {PieceRep} from "../chess/Piece";
import {initialPosition} from "../chess/Chess";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import $ from 'jquery';
import 'jqueryui';


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


    public onDragStart(e: React.DragEvent): void {
        let target: HTMLElement = e.target as HTMLElement;
    }

    public onDragEnter(e: React.DragEvent): void {
        let target: HTMLElement = e.target as HTMLElement;
        target.classList.add('highlight');
    }

    public onDragEnd(e: React.DragEvent): void {
        let target: HTMLElement = e.target as HTMLElement;
    }

    public onDragExit(e: React.DragEvent): void {
        let target: HTMLElement = e.target as HTMLElement;
        target.classList.remove('highlight');
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
                                    return <td key={j} className={(i + j) % 2 == 1 ? 'dark-tile' : 'light-tile'}
                                               id={`${i}-${j}`}
                                    >
                                        <ChessPiece player={item.color} piece={item.piece} i={i} j={j}
                                                    handleDragEnd={this.onDragEnd}
                                        />
                                    </td>;
                                })
                                }
                            </tr>;
                        })) : (this.board.map((row, i) => {
                            return <tr key={i}>
                                {row.map((item, j) => {
                                    return <td key={j} className={(i + j) % 2 == 1 ? 'dark-tile' : 'light-tile'}>
                                        <ChessPiece player={item.color} piece={item.piece} i={i} j={j}
                                                    handleDragEnd={this.onDragEnd}/>
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

    public update() {
        $('table.grid td').on('dragenter', (e: Event) => {
            let target: HTMLElement = e.target as HTMLElement;
            target.classList.add('highlight');
        });
        $('table.grid td').on('dragleave', (e: Event) => {
            let target: HTMLElement = e.target as HTMLElement;
            target.classList.remove('highlight');
        });
        $('.piece').on('dragend', (e: Event) => {
            let target: HTMLElement = e.target as HTMLElement;
        });
        $('.piece').draggable({});
        $('.grid td').droppable({
            drop: (e, ui) => {
                e.target.innerHTML = '';
                e.target.appendChild(ui.draggable[0]);
                ui.draggable.css({top: '0px', left: '0px'});
            }
        })

        console.log("Hello");
    }
}
