import {Chessboard, Tile} from "./Chessboard";
import {Bishop, King, Knight, Pawn, Piece, pieceType, pieceValue, Queen, Rook} from "./Piece";

export class Player {
  protected color: boolean;
  protected board: Chessboard;
  protected opponent: Player | null = null;
  protected pieces: Array<Array<Piece> | Queen | King> | null = null;
  protected captureCallback: null | ((piece: Piece) => void) = null;

  constructor(color: boolean, board: Chessboard) {
    this.color = color;
    this.board = board;
    this.getColor = this.getColor.bind(this);
    this.reset = this.reset.bind(this);
    this.reset();
  }

  public getColor(): boolean {
    return this.color;
  }

  public getBoard(): Chessboard {
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
    this.pieces = new Array<Array<Piece> | Queen | King>(6);
    for (let i = 0; i < 4; i++) {
      this.pieces[i] = new Array<Piece>();
    }
    const tiles: Tile[][] = this.board.getBoard();
    tiles.forEach((r) => {
      r.forEach((t) => {
        if (t.getPiece()) {
          const p = t.getPiece();
          // @ts-ignore
          if (p.getColor() === this.color) {
            // @ts-ignore
            p.setPlayer(this);
            // @ts-ignore
            switch (p.getType()) {
              case -1:
                break;
              case pieceType.pawn:
                // @ts-ignore
                this.pieces[pieceType.pawn].push(p);
                break;
              case pieceType.knight:
                // @ts-ignore
                this.pieces[pieceType.knight].push(p);
                break;
              case pieceType.bishop:
                // @ts-ignore
                this.pieces[pieceType.bishop].push(p);
                break;
              case pieceType.rook:
                // @ts-ignore
                this.pieces[pieceType.rook].push(p);
                break;
              case pieceType.queen:
                // @ts-ignore
                this.pieces[pieceType.queen] = p;
                break;
              case pieceType.king:
                // @ts-ignore
                this.pieces[pieceType.king] = p;
                break;

              default:
                break;
            }
          }
        }
      })
    })
    //   this.pieces = [] = new Array<Array<Piece>>()
    //   const p: Array<Pawn> = [];
    //
    // for (let i = 0; i < 8; i++) {
    //   p.push(new Pawn(this.color ? 1 : 6, i, this, i));
    // }
    // this.pieces.push(p);
    //
    // const n: Array<Knight> = [];
    // n.push(new Knight(this.color ? 0 : 7, 1, this, 0));
    // n.push(new Knight(this.color ? 0 : 7, 6, this, 1));
    // this.pieces.push(n);
    //
    // const b: Array<Bishop> = [];
    // b.push(new Bishop(this.color ? 0 : 7, 2, this, 0));
    // b.push(new Bishop(this.color ? 0 : 7, 5, this, 1));
    // this.pieces.push(b);
    //
    // const r: Array<Rook> = [];
    // b.push(new Rook(this.color ? 0 : 7, 0, this, 0));
    // b.push(new Rook(this.color ? 0 : 7, 7, this, 1));
    // this.pieces.push(b);
    //
    // const q: Queen = new Queen(this.color ? 0 : 7, 3, this, 0);
    // const k: King = new King(this.color ? 0 : 7, 4, this, 0);
    //
    // this.pieces.push(q);
    // this.pieces.push(k);
    //
    // for (let j = 0; j < 8; j++) {
    //   // @ts-ignore
    //   this.pieces[0][j].giveLife(this.color ? 1 : 6, j);
    //   // @ts-ignore
    //   this.pieces[0][j].reset();
    // }
    //
    // // The knight
    // // @ts-ignore
    // this.pieces[1][0].giveLife(this.color ? 0 : 7, 1);
    // // @ts-ignore
    // this.pieces[1][0].reset();
    //
    // // @ts-ignore
    // this.pieces[1][1].giveLife(this.color ? 0 : 7, 6);
    // // @ts-ignore
    // this.pieces[1][1].reset();
    //
    //
    // // The bishop
    // // @ts-ignore
    // this.pieces[2][0].giveLife(this.color ? 0 : 7, 2);
    // // @ts-ignore
    // this.pieces[2][0].reset();
    //
    // // @ts-ignore
    // this.pieces[2][1].giveLife(this.color ? 0 : 7, 5);
    // // @ts-ignore
    // this.pieces[2][1].reset();
    //
    // // The Rook
    // // @ts-ignore
    // this.pieces[3][0].giveLife(this.color ? 0 : 7, 0);
    // // @ts-ignore
    // this.pieces[3][0].reset();
    //
    // // @ts-ignore
    // this.pieces[3][1].giveLife(this.color ? 0 : 7, 7);
    // // @ts-ignore
    // this.pieces[3][1].reset();
    //
    // // The queen
    // // @ts-ignore
    // this.pieces[2][0].giveLife(this.color ? 0 : 7, 3);
    // // @ts-ignore
    // this.pieces[2][0].reset();
    //
    // // The king
    // // @ts-ignore
    // this.pieces[2][0].giveLife(this.color ? 0 : 7, 4);
    // // @ts-ignore
    // this.pieces[2][0].reset();

  }

  public capture(piece
                   :
                   Piece
  ) {
    //@ts-ignore
    this.captureCallback(piece);
  }
}