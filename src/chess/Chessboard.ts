import {createPiece, Piece, PieceRep} from "./Piece";

export class Tile {
  private piece: Piece | null;
  private x: number;
  private y: number;

  constructor(x: number, y: number, piece: Piece | null = null) {
    this.x = x;
    this.y = y;
    this.piece = piece;
    this.piece?.giveLife(x, y);
  }

  public getPiece(): Piece | null {
    return this.piece;
  }

  public setPiece(piece: Piece | null) {
    this.piece = piece;
    this.piece?.setXY(this.x, this.y)
  }
}

export class Chessboard {
  // @ts-ignore
  protected board: Tile[][];

  constructor(props: { board: PieceRep[][] }) {
    this.init(props);
    this.updatePosition(props.board);
  }

  public init(props: any) {
  }


  public updatePosition(pieceRep: PieceRep[][]) {
    this.board = [];
    pieceRep.map((d, i) => {
      const arr: Tile[] = [];
      d.map((t, j) => {
        arr.push(new Tile(i, j, createPiece(t, this)));
      });
      this.board.push(arr);
    });
  }

  public printBoard() {
    //TODO print the board
  }

  public getBoard(): Tile[][] {
    return this.board;
  }


  public getPieceRep(): Array<Array<PieceRep>> {
    const pieceRep: Array<Array<PieceRep>> = [];
    this.board.forEach((d, i) => {
      const arr: Array<PieceRep> = [];
      d.forEach((t: Tile, j) => {
        const piece: Piece | null = t.getPiece();
        const rep: PieceRep = {piece: -1, color: true};
        if (piece) {
          console.log(piece);
          rep.color = piece.getColor()
          rep.piece = piece.getType()
        }
        arr.push(rep);
      });
      pieceRep.push(arr);
    });
    return pieceRep;
  }
}

