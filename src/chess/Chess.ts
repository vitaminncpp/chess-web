import {PieceRep} from "./Piece";

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

    constructor() {

    }

    public toString(): string {
        return this.moveString;
    }

    public parse(str: string): void {

    }

    public stringify(): void {

    }
}
