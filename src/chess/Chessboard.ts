import {Piece, PieceRep} from "./Piece";

export class Tile {
    private piece: Piece | null;

    constructor(x: number, y: number) {
        this.piece = null;
    }

    public get getPiece(): Piece | null {
        return this.piece;
    }

    public setPiece(piece: Piece | null) {
        this.piece = piece;
    }
}

export class Chessboard {
    board: Tile[][];

    constructor(props: { board: PieceRep[][] }) {
        this.board = new Array<Array<Tile>>();
        for (let i = 0; i < 8; i++) {
            this.board.push(new Array<Tile>);
            for (let j = 0; j < 8; j++) {
                this.board[i].push(new Tile(i, j));
            }
        }
    }

    public resetBoard(): void {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.board[i][j].setPiece(null);
            }
        }
    }

    public printBoard() {
        //TODO print the board
    }

    public getBoard(): Tile[][] {
        return this.board;
    }


}

