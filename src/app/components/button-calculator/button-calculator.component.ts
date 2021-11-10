import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-calculator',
  templateUrl: './button-calculator.component.html'
})
export class ButtonCalculatorComponent implements OnInit {

  @Input() btnNumber: string;
  @Input() classes: string;
  @Output() clickedValue = new EventEmitter();

  class: string = 'button-item';
  constructor() { }

  ngOnInit(): void {
    this.setClasses();
  }

  clicked(): void{
    this.clickedValue.emit(this.btnNumber)
  }
  
  setClasses(): void {
    if(this.classes) this.class = `${this.class} ${this.classes}`;
  }

}
