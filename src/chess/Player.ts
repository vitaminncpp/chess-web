import {Chess} from "../components/Chess";
import {Chessboard, Tile} from "./Chessboard";

export class Player {
    protected color: boolean;
    protected chessboard: Chessboard;

    constructor(color: boolean, chessboard: Chessboard) {
        this.color = color;
        this.chessboard = chessboard;
        //this binding
        this.getColor = this.getColor.bind(this);
    }

    public getColor(): boolean {
        return this.color;
    }

    public getBoard(): Tile[][] {
        return this.chessboard.getBoard();
    }
}