import {Player} from "./Player";
import {Chessboard} from "./Chessboard";
import {ChessState, Move} from "./Chess";

export abstract class Piece {
  protected x: number;
  protected y: number;
  protected player: Player | null;
  protected color: boolean;
  protected value = 0;
  protected type = -1;
  protected legaMoves = 0;
  protected index = -1;
  protected moveMap: boolean[][] = [];
  protected attackMap: boolean[][] = [];
  protected moved = false;
  protected alive = true;
  protected board: Chessboard;

  protected constructor(x: number, y: number, color: boolean, board: Chessboard) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.board = board;
    this.reset();
    this.player = null;
  }

  public setPlayer(player: Player) {
    this.player = player
  }

  public getValue(): number {
    return this.value;
  }

  public getType(): number {
    return this.type;
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

  abstract updateAttackMap(): void;

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

  public setXY(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public giveLife(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.alive = true;
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

  public moveTo(x: number, y: number): Move {
    //TODO Move to specified position
    const move = new Move();
    move.setSource(this.x, this.y);
    move.setDestination(x, y);

    if (this.moveMap[x][y]) {
      //@ts-ignore
      if (this.board[x][y].getPiece() != null) {
        move.setState(ChessState.CAPTURE_MOVE);
        //@ts-ignore
        this.player.capture(this.board[x][y].getPiece());
      }
    }
    return move;
  }

  public testMoveMap(x: number, y: number): boolean {
    const pX: number = this.x;
    const pY: number = this.y;

    if (x < 0 || x > 7 || y < 0 || y > 7) {
      return false;
    }
    if (this.board.getBoard()[x][y].getPiece() !== null) {
      return false;
    }
    if (this.board.getBoard()[x][y].getPiece()?.getColor() === this.color) {
      return false;
    }
    const temp: Piece | null = this.board.getBoard()[x][y].getPiece();

    this.board.getBoard()[x][y].setPiece(this);
    this.board.getBoard()[this.x][this.y].setPiece(null);

    this.setXY(x, y);

    if (temp) {
      temp.capture();
    }
    // @ts-ignore
    this.player.getOpponent().updateAttackMap();

    // TODO check check
    return true;
  }

  public reset() {
    this.resetMoveMap();
    this.resetAttackMap();
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public boundryCheck(x: number, y: number): boolean {
    return !(x < -0 || x > 7 || y < -0 || y > 7);
  }

  public isValidMove(x: number, y: number): boolean {
    return this.board.getBoard()[x][y].getPiece()?.getColor() === this.color;
  }
}

export class Pawn extends Piece {
  constructor(x: number, y: number, color: boolean, board: Chessboard) {
    super(x, y, color, board);
    this.value = pieceValue.pawn;
    this.type = pieceType.pawn;
  }

  public updateMoveMap() {

  }

  public updateAttackMap() {

  }

}

export class Knight extends Piece {

  constructor(x: number, y: number, color: boolean, board: Chessboard) {
    super(x, y, color, board);
    this.value = pieceValue.knight;
    this.type = pieceType.knight;
  }

  updateMoveMap(): void {
    this.resetMoveMap();
    const one = [-1, 1];
    const two = [-2, 2];

    one.forEach((i) => {
      two.forEach(j => {
        try {
          this.moveMap[this.x + i][this.y + j] = this.testMoveMap(this.x + i, this.y + j);
        } catch (err) {
          return;
        }
      })
    })
  }

  public updateAttackMap() {

    this.resetAttackMap();
    const one = [-1, 1];
    const two = [-2, 2];

    one.forEach((i) => {
      two.forEach(j => {
        try {
          this.attackMap[this.x + i][this.y + j] = true;
        } catch (err) {
          return;
        }
      })
    })
  }

}

export class Bishop extends Piece {

  constructor(x: number, y: number, color: boolean, board: Chessboard) {
    super(x, y, color, board);
    this.value = pieceValue.bishop;
    this.type = pieceType.bishop;
  }

  public updateMoveMap(): void {
    this.resetMoveMap();
    const dx = [-1, 1];

    dx.forEach((x) => {
      dx.forEach(y => {
          for (let i = this.x + x; i < 8; i += x) {
            for (let j = this.y + y; j < 8; j++) {
              if (this.board.getBoard()[i][j].getPiece() !== null || this.board.getBoard()[i][j].getPiece()?.getColor() === this.color)
                break;
              try {
                this.moveMap[i][j] = this.testMoveMap(i, j);
              } catch (err) {
                return;
              }

            }
          }
        }
      )
    })
  }


  public updateAttackMap() {
    this.resetAttackMap()
    const d = [-1, 1];
    d.forEach((x) => {
      d.forEach(y => {
        for (let i = this.x + x; i < 8; i += x) {
          for (let j = this.y + y; j < 8; j++) {
            try {
              this.attackMap[i][j] = true;
            } catch (err) {
              return;
            }
          }
        }
      })
    })
  }

}

export class Rook
  extends Piece {
  constructor(x: number, y: number, color: boolean, board: Chessboard) {
    super(x, y, color, board);
    this.value = pieceValue.rook;
    this.type = pieceType.rook;
  }

  public updateMoveMap(): void {
    this.resetMoveMap();
    const d = [-1, 1];
    d.forEach(x => {
      d.forEach(y => {
        try {
          this.moveMap[this.x + x][this.y + y] = this.testMoveMap(this.x + x, this.y + y);
        } catch (err) {
          return;
        }
      })
    })
  }

  public updateAttackMap() {
  }

}

export class Queen extends Piece {
  constructor(x: number, y: number, color: boolean, board: Chessboard) {
    super(x, y, color, board);
    this.value = pieceValue.queen;
    this.type = pieceType.queen;
  }

  public updateMoveMap(): void {
  }

  public updateAttackMap(): void {
  }

}

export class King extends Piece {

  constructor(x: number, y: number, color: boolean, board: Chessboard) {
    super(x, y, color, board);
    this.value = pieceValue.king;
    this.type = pieceType.king;
  }

  public updateMoveMap(): void {
    const d = [-1, 0, 1];
    d.forEach(x => {
      d.forEach(y => {
        if (x === 0 && y === 0) {
          return;
        }
        this.moveMap[this.x + x][this.y + y] = this.testMoveMap(this.x + x, this.y + y);
      })
    })
  }

  public updateAttackMap() {
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
};

export const pieceValue = {
  empty: 0,
  pawn: 1,
  knight: 3,
  bishop: 3,
  rook: 5,
  queen: 9,
  king: 1000,
};

export type PieceRep = {
  piece: number;
  color: boolean;
}


export function createPiece(p: PieceRep, board: Chessboard): Piece | null {
  switch (p.piece) {
    case pieceType.pawn:
      return new Pawn(-1, -1, p.color, board);
    case pieceType.knight:
      return new Knight(-1, -1, p.color, board);
    case pieceType.bishop:
      return new Bishop(-1, -1, p.color, board);
    case pieceType.rook:
      return new Rook(-1, -1, p.color, board);
    case pieceType.queen:
      return new Queen(-1, -1, p.color, board);
    case pieceType.king:
      return new King(-1, -1, p.color, board);
    default:
      return null;
  }
}