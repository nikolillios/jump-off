import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NumberLineComponent } from './number-line/number-line.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { GameComponent } from './game/game.component';
import { DirectionsComponent } from './directions/directions.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberLineComponent,
    SpinnerComponent,
    GameComponent,
    DirectionsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
