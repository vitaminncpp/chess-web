import {ChessState} from "./Chess";

export class State {
  protected turn: boolean = true;
  protected checkState: ChessState = ChessState.CHECK_NONE;

  constructor(props: {}) {

  }

  public reset(): void {
    this.turn = true;
    this.checkState = ChessState.CHECK_NONE;
  }

  public getTurn(): boolean {
    return this.turn;
  }

  public getCheckState(): ChessState {
    return this.checkState;
  }

  public setCheckState(state: ChessState) {
    this.checkState = state;
  }

}