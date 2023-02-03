import {Chessboard} from "./Chessboard";

export class Player {
    protected color: boolean;


    constructor(color: boolean, chessboard: Chessboard) {
        this.color = color;

        //this binding
        this.getColor = this.getColor.bind(this);
    }

    public getColor(): boolean {
        return this.color;
    }
}