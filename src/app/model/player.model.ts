export class Player {
  position: number;
  isCurrPlayer: boolean;
  constructor(isCurr: boolean) {
    this.position = 0;
    this.isCurrPlayer = isCurr;
  }

} 