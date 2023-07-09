import {Chessboard} from "./Chessboard";
import {PieceRep} from "./Piece";
import {Player} from "./Player";
import {State} from "./State";

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
  private sX = -1;
  private sY = -1;

  //destination
  private dX = -1;
  private dY = -1;

  //move string
  private moveString = "";
  private player = true;
  private message: string = "";

  private board: number[][] = new Array<Array<number>>(8);
  private state: ChessState = ChessState.NOT_APPLICABLE;
  private checkState: ChessState = ChessState.CHECK_NONE;

  private map: boolean[][] | null = null;
  private turn = true;

  constructor() {
    this.reset();
  }

  public toString(): string {
    return this.moveString;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public parse(str: string): void {

  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
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

    this.message = ""
  }

  public getMessage(): string {
    return this.message
  }

  public setMessage(message: string) {
    this.message = message
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

  getTurn() {
    return this.turn;
  }
}

export class ChessGame {
  protected white: Player;
  protected black: Player;
  protected board: Chessboard;
  protected position: PieceRep[][];
  protected state: State = new State({});

  public constructor(props: { position: PieceRep[][], turn: boolean } = {
    position: initialPosition,
    turn: true
  }) {
    this.position = props.position;
    this.board = new Chessboard({board: props.position ? props.position : initialPosition});
    this.white = new Player(true, this.board);
    this.black = new Player(false, this.board);
    this.white.setOpponent(this.black)
    this.black.setOpponent(this.white)
  }

  public reset(): void {
    this.board.updatePosition(this.position);
    this.white.reset();
    this.black.reset();
  }

  public getBoard(): Chessboard {
    return this.board;
  }

  public move(move: Move): Move {
    if (this.state.getTurn() !== move.getTurn()) {
      move.setState(ChessState.NOT_APPLICABLE)
    }
    return move;
  }
}
