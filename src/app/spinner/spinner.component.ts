import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  value: number;
  offset: number;
  @Output() public numberChosen = new EventEmitter();
  @Output() buttonEnabled = new EventEmitter<boolean>();

  @Input('isClickable')
  set clickable(b: boolean) {
    console.log('sdfjsdfo');
    this.setButton(b);
  }

  constructor() { }

  ngOnInit(): void {
    this.offset = 0;
  }

  setButton(b: boolean) {
    var button = <HTMLButtonElement>document.getElementById("ones-button")
    button.disabled = !b;
    this.buttonEnabled.emit(b);
  }

  spinOnesWheel() {
    var button = <HTMLButtonElement>document.getElementById("ones-button")
    this.setButton(false);
    var min = 1080, max = 7200;
    var t = Math.floor(Math.random() * (max - min)) + min;
    var rotation = t + this.offset;
    var wheel = document.getElementById("ones-wheel");

    // to ensure ticker is pointing at correct section while ensuring wheel 
    // result is fair
    if (((rotation + 9) % 18) < 3) {
      rotation += 3;
    } else if (((rotation + 9) % 18) > 15) {
      rotation -= 3;
    }
    wheel.style.transform = "rotate(" + rotation + "deg)";
    this.offset = rotation;
    var result = (rotation + 9) % 360;
    console.log('result: ' + result)
    switch (Math.floor(result / 18)) {
      case 0: {
        this.value = 1;
        break;
      }
      case 1: {
        this.value = -9;
        break;
      }
      case 2: {
        this.value = 0;
        break;
      }
      case 3: {
        this.value = -8;
        break;
      }
      case 4: {
        this.value = 9;
        break;
      }
      case 5: {
        this.value = -7;
        break;
      }
      case 6: {
        this.value = 8;
        break;
      }
      case 7: {
        this.value = -6;
        break;
      }
      case 8: {
        this.value = 7;
        break;
      }
      case 9: {
        this.value = -5;
        break;
      }
      case 10: {
        this.value = 6;
        break;
      }
      case 11: {
        this.value = -4;
        break;
      }
      case 12: {
        this.value = 5;
        break;
      }
      case 13: {
        this.value = -3;
        break;
      }
      case 14: {
        this.value = 4;
        break;
      }
      case 15: {
        this.value = -2;
        break;
      }
      case 16: {
        this.value = 3;
        break;
      }
      case 17: {
        this.value = -1;
        break;
      }
      case 18: {
        this.value = 2;
        break;
      }
      case 19: {
        this.value = 0;
        break;
      }
      // for error finding
      default: {
        this.value = 100;
        break;
      }
    }
    this.numberChosen.emit(this.value);
  }

}
