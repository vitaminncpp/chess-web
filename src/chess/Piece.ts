import {Player} from "./Player";

export class Piece {
    protected x: number;
    protected y: number;
    protected player: Player;
    protected color: boolean;

    constructor(player: Player, x: number, y: number) {
        this.player = player;
        this.x = x;
        this.y = y;
        this.color = player.getColor();
    }
}

export class Pawn extends Piece {

}

export class Knight extends Piece {

}

export class Bishop extends Piece {

}

export class Rook extends Piece {

}

export class Queen extends Piece {

}

export class King extends Piece {

}

export const pieceType = {
    empty: -1,
    pawn: 0,
    knight: 1,
    bishop: 2,
    rook: 3,
    queen: 4,
    king: 5,
}

export const pieceValue = {
    empty: 0,
    pawn: 1,
    knight: 3,
    bishop: 3,
    rook: 5,
    queen: 9,
    king: 1000,
}

export type PieceRep = {
    piece: number;
    color: boolean;
}
