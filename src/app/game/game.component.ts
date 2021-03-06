import { Component, OnInit } from '@angular/core';
import { Player } from '../model/player.model';
import io from "socket.io-client";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  players: Player[];
  currPlayerIndex: number;
  spins: [number[], number[]];
  boardLength: number = 16;
  turn: number = 0;
  boardSelection: number;
  buttonEnabled: boolean = true;
  message: string = "";
  playAgain: boolean = false;
  hintAvail: boolean = false;
  winner: number;
  private socket: any;
  constructor() {
    this.currPlayerIndex = 0;
    this.spins = [[], []]
  }

  ngOnInit(): void {
    this.players = [new Player(true), new Player(false)];
    this.socket = io();
  }

  ngAfterInit() {
    this.socket.on('message', data => {
      console.log('message: ' + data);
    });
  }


  registerSpin(value: number) {
    console.log(value);
    this.setLastSpinVal(value);
  }

  registerSelection(index: number) {
    this.boardSelection = index;
    if (this.boardSelection == this.players[this.currPlayerIndex].position
      + this.lastSpinVal()) {
      this.players[this.currPlayerIndex].position = this.boardSelection;
      this.buttonEnabled = true;
      console.log('button: ' + this.buttonEnabled);
      this.nextPlayer();
      this.hintAvail = false;
    } else {
      if (!this.buttonEnabled) {
        this.hintAvail = true;
        this.promptPlayer('Try again ');
      }
    }
  }

  nextPlayer() {
    if (this.currPlayerIndex == this.players.length - 1) {
      console.log(this.players.length);
      this.currPlayerIndex = 0;
      console.log('curr player: ' + this.currPlayerIndex);
    } else {
      this.currPlayerIndex++;
    }
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].isCurrPlayer = !this.players[i].isCurrPlayer;
    }
    this.promptPlayer('Spin the wheel and select your destination on the number line');
    this.turn++;
  }

  setLastSpinVal(steps: number) {
    this.spins[this.currPlayerIndex].push(steps);
  }

  lastSpinVal(): number {
    let arr = this.spins[this.currPlayerIndex];
    console.log(arr.length);
    let val = arr.pop();
    arr.push(val);
    if (arr.length >= this.turn / 2) {
      return val;
    }
    return null;
  }

  promptPlayer(message: string) {
    this.message = message;
  }

  attemptJumpOff() {
    if (this.players[this.currPlayerIndex].position + this.lastSpinVal() > this.boardLength) {
      this.promptPlayer('You have jumped off and won! Congratulations to player '
        + (this.currPlayerIndex == 0 ? 'green' : 'red'));
      this.players[this.currPlayerIndex].position = this.boardLength + 1;
      this.playAgain = true;
      this.winner = this.currPlayerIndex;
    } else {
      if (!this.buttonEnabled) {
        this.promptPlayer('Can not jump from here');
        this.hintAvail = true;
      }
    }
  }

  restartGame() {
    console.log('restart');
    this.spins = [[], []];
    this.currPlayerIndex = 0;
    this.turn = 0;
    this.buttonEnabled = true;
    this.message = "";
    this.playAgain = false;
    this.winner = null;
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].position = 0;
    }
  }

  lessThanSelected() {
    if (this.players[this.currPlayerIndex].position + this.lastSpinVal() < 0) {
      this.players[this.currPlayerIndex].position = 0;
      this.nextPlayer();
      this.buttonEnabled = true;
      this.hintAvail = false;
    } else {
      if (!this.buttonEnabled) {
        this.hintAvail = true;
        this.promptPlayer('Try again ');
      }
    }
  }

  showHint() {
    this.promptPlayer('You are at position ' + this.players[this.currPlayerIndex].position +
      ' and need to jump ' + this.lastSpinVal() + ' steps');
    this.hintAvail = false;
  }

}
