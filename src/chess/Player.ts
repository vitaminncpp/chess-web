import {Tile} from "./Chessboard";
import {Pawn, Piece} from "./Piece";

export class Player {
    protected color: boolean;
    protected board: Tile[][];
    protected opponent: Player | null = null;
    protected pieces: Array<Array<Piece>>;
    protected captureCallback: null | ((piece: Piece) => void) = null;

    constructor(color: boolean, board: Tile[][]) {
        this.color = color;
        this.board = board;
        this.getColor = this.getColor.bind(this);


        //Piece Initialization
        this.pieces = new Array<Array<Piece>>();
        this.pieces.push(new Array<Piece>());

        for (let i = 0; i < 8; i++) {
            this.pieces[0].push(new Pawn(this.color ? 1 : 6, i, this, i));
        }
    }

    public getColor(): boolean {
        return this.color;
    }

    public getBoard(): Tile[][] {
        return this.board;
    }

    public setOpponent(opponent: Player) {
        this.opponent = opponent;
    }

    public getOpponent(): Player {
        //@ts-ignore
        return this.opponent;
    }

    public updateAttackMap() {

    }

    private static arrayOR_ACC(dest: boolean[][], src: boolean[][]): boolean[][] {
        if (dest.length !== src.length) {
            //TODO: common Logger
            return dest;
        }

        for (let i = 0; i < dest.length; i++) {
            if (dest[i].length !== src[i].length) {
                //TODO: common Logger
                return dest;
            }
            for (let j = 0; j < dest[i].length; j++) {
                dest[i][j] = src[i][j] || dest[i][j];
            }
        }
        return dest;
    }

    public reset() {
        for (let j = 0; j < 8; j++) {
            this.pieces[0][j].giveLife(this.color ? 1 : 6, j);
            this.pieces[0][j].reset();
        }
    }

    public capture(piece: Piece) {
        //@ts-ignore
        this.captureCallback(piece);
    }
}