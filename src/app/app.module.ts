import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonCalculatorComponent } from './components/button-calculator/button-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonCalculatorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
