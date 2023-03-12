import {PieceRep, pieceValue} from "./Piece";
import {Chessboard} from "./Chessboard";


//@formatter:off
export const initialPosition: Array<Array<PieceRep>> = [
    [{piece:3,color:false}, {piece:1,color:false}, {piece:2,color:false}, {piece:4,color:false}, {piece:5,color:false}, {piece:2,color:false}, {piece:1,color:false}, {piece:3,color:false}],
    [{piece:0,color:false}, {piece:0,color:false}, {piece:0,color:false}, {piece:0,color:false}, {piece:0,color:false}, {piece:0,color:false}, {piece:0,color:false}, {piece:0,color:false}],
    [{piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true},],
    [{piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true},],

    [{piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true},],
    [{piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true}, {piece:-1,color:true},],
    [{piece:0,color:true}, {piece:0,color:true}, {piece:0,color:true}, {piece:0,color:true}, {piece:0,color:true}, {piece:0,color:true}, {piece:0,color:true}, {piece:0,color:true}],
    [{piece:3,color:true}, {piece:1,color:true}, {piece:2,color:true}, {piece:4,color:true}, {piece:5,color:true}, {piece:2,color:true}, {piece:1,color:true}, {piece:3,color:true}],
];
////@formatter:on

export enum MoveType {
    NORMAL,
    CAPTURE,
    SHORT_CASTLE,
    LONG_CASTLE,
    PROMOTION,
    EN_PASSANT,
    CHECK,
    CHECKMATE,
}


export enum ChessState {
    NOT_APPLICABLE,
    INVALID_STATE,
    NORMAL_STATE,
    SELECTED_STATE,
    EMPTY_SELECTION,
    INVALID_SELECTION,

    NORMAL_MOVE,
    ILLEGAL_MOVE,
    CAPTURE_MOVE,
    CHECK_MOVE,
    PROMOTION_MOVE,

    CHECK_NONE,
    WHITE_CHECK,
    BLACK_CHECK,
    WHITE_CHECKMATE,
    BLACK_CHECKMATE,
    WHITE_STALEMATE,
    BLACK_STALEMATE
}

export class Move {
    //source
    private sX: number = -1;
    private sY: number = -1;

    //destination
    private dX: number = -1;
    private dY: number = -1;

    //move string
    private moveString: string = "";
    private player: boolean = true;

    private board: number[][] = new Array<Array<number>>(8);
    private state: ChessState = ChessState.NOT_APPLICABLE;
    private checkState: ChessState = ChessState.CHECK_NONE;

    private map: boolean[][] | null = null;
    private turn: boolean = true;

    constructor() {
        this.reset();
    }

    public toString(): string {
        return this.moveString;
    }

    public parse(str: string): void {

    }

    public stringify(): void {

    }

    public setSource(sX: number, sY: number): void {
        this.sX = sX;
        this.sY = sY;
    }

    public setDestination(dX: number, dY: number): void {
        this.dX = dX;
        this.dY = dY;
    }

    public getState(): ChessState {
        return this.state;
    }

    public reset() {
        this.state = ChessState.NOT_APPLICABLE;
        this.checkState = ChessState.CHECK_NONE;

        this.sX = -1;
        this.sY = -1;
        this.dX = -1;
        this.dY = -1;

        this.map = null;
        this.turn = true;
    }

    public getSX(): number {
        return this.sX;
    }

    public getSY(): number {
        return this.sY;
    }

    public getDX(): number {
        return this.dX;
    }

    public getDY(): number {
        return this.dY;
    }

    public setState(state: ChessState) {
        this.state = state;
    }
}


export class ChessGame {
    board: Chessboard;

    constructor(props: { position: PieceRep[][], turn: boolean }) {
        this.board = new Chessboard({board: initialPosition});
    }
}
