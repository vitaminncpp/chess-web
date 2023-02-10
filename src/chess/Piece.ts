import {Player} from "./Player";

export abstract class Piece {
    protected x: number;
    protected y: number;
    protected player: Player;
    protected color: boolean;
    protected value: number = 0;
    protected type: number = -1;
    protected legaMoves: number = 0;
    protected index: number = -1;
    protected moveMap: boolean[][] = [];
    protected attackMap: boolean[][] = [];
    protected moved: boolean = false;
    protected alive: boolean = false;

    constructor(x: number, y: number, player: Player, index: number) {
        this.player = player;
        this.x = x;
        this.y = y;
        this.color = player.getColor();
        this.index = index;
    }

    public resetMoveMap() {
        this.legaMoves = 0;
        this.moveMap = [];
        for (let i = 0; i < 8; i++) {
            this.moveMap.push([]);
            for (let j = 0; j < 8; j++) {
                this.moveMap[i].push(false);
            }
        }
    }

    public resetAttackMap() {
        for (let i = 0; i < 8; i++) {
            this.attackMap.push([]);
            for (let j = 0; j < 8; j++) {
                this.attackMap[i].push(false);
            }
        }
    }

    abstract updateMoveMap(): void;

    public getColor(): boolean {
        return this.color;
    }

    public capture() {
        this.alive = false;
        this.x = -1;
        this.y = -1;
        this.resetMoveMap();
        this.resetAttackMap();
    }

    public giveLife(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.alive = true;
        //TODO: Set this Piece on board
    }

    public getMoveMap(): boolean[][] {
        return this.moveMap;
    }

    public getLegalMoves(): number {
        return this.legaMoves;
    }

    public isAlive(): boolean {
        return this.alive;
    }

    public moveTo(x: number, y: number) {
        //TODO Move to specified position
    }
}

export class Pawn extends Piece {
    constructor(x: number, y: number, player: Player, index: number) {
        super(x, y, player, index);
        this.value = pieceValue.pawn;
        this.type = pieceType.pawn;
    }

    public updateMoveMap() {

    }
}

export class Knight extends Piece {
    updateMoveMap(): void {
    }

}

export class Bishop extends Piece {
    updateMoveMap(): void {
    }

}

export class Rook extends Piece {
    updateMoveMap(): void {
    }

}

export class Queen extends Piece {
    updateMoveMap(): void {
    }

}

export class King extends Piece {
    updateMoveMap(): void {
    }

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
