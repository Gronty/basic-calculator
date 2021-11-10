import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'basic-calculator';

  numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
  operators = ['+', '-', '/', '*'];
  isFirstNumber: boolean = true;
  isEvaluated: boolean = false;
  hasError: boolean = false;
  firstValue: string = '';
  secondValue: string = '';
  selectedOperator: string = '';

  private _result: string = '';

  constructor() { }

  public get result(): string {
    return this._result;
  }

  public set result(v: string) {
    this._result = v;
  }

  type(value: Event): void {
    if (!this.hasError) {
      if (this.isFirstNumber) {
        this.firstValue += value;
      } else {
        this.secondValue += value;
      }
    }
  }

  selectOperator(operator: Event) {
    if (!this.hasError) {
      const eventValue = operator.toString()
      if (eventValue !== this.selectedOperator) {
        this.isFirstNumber = false;
        this.selectedOperator = eventValue;
      }
    }
  }

  evaluate(): void {
    if (this.checkIfValid()) {
      try {
        this.result = eval(`${this.firstValue}${this.selectedOperator}${this.secondValue}`);
        this.checkEvalErrors();
        this.isEvaluated = true;
        this.isFirstNumber = true;
        this.firstValue = this.result;
        this.secondValue = '';
        this.selectedOperator = '';
      } catch (e) {
        if (e instanceof SyntaxError) {
          this.result = 'ERROR';
          this.isEvaluated = false;
          this.isFirstNumber = true;
          this.hasError = true;
          this.firstValue = '';
          this.secondValue = '';
          this.selectedOperator = '';
          console.error("Syntax error");
        }
      }
    }
  }

  reset(): void {
    this.isFirstNumber = true;
    this.isEvaluated = false;
    this.hasError = false;
    this.firstValue = '';
    this.secondValue = '';
    this.selectedOperator = '';
    this.result = '';
  }

  restartFlag() {
    this.isFirstNumber = true;
  }

  checkIfValid(): boolean {
    return (this.firstValue !== '' && this.selectedOperator !== '' && this.secondValue !== '');
  }

  isPristine(): boolean {
    return (this.firstValue === '' && !this.isEvaluated && !this.hasError);
  }

  checkEvalErrors(): void {
    if (this.result.toString() === 'Infinity') {
      this.hasError = true;
      console.error("Error can't divide using 0");
    }
    if (this.result.toString() === 'NaN') {
      this.hasError = true;
      this.result = 'NaN';
      console.error("The expresion used generated a not a number value");
    }
  }
}
