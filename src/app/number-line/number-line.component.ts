import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../model/player.model';
@Component({
  selector: 'app-number-line',
  templateUrl: './number-line.component.html',
  styleUrls: ['./number-line.component.css']
})
export class NumberLineComponent implements OnInit {

  nums: number[];
  @Input('players') players: Player[];
  @Input('winner') winner: number;
  @Output() selected = new EventEmitter<number>();
  @Output() jumpedOff = new EventEmitter<number>();
  @Output() lessThan = new EventEmitter<number>();

  constructor() {
    this.nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  }

  ngOnInit(): void {

  }

  attemptJumpOff() {
    this.jumpedOff.emit();
  }

  isAtIndex(ind: number, player: Player): boolean {
    if (ind == player.position) {
      return true;
    }
    return false;
  }

  registerClick(index: number) {
    this.selected.emit(index);
  }

  lessThanClicked() {
    this.lessThan.emit();
  }

}
