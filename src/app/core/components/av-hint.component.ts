import { Component, Input } from '@angular/core';

@Component({
  selector: 'av-hint',
  template: `
    <md-hint align="start" *ngIf="isTooShortString()">
      {{value.length}} символов / минимум {{minlength}}
    </md-hint> 
  `
})

export class InputValidateHintComponent {
  @Input() value: string;
  @Input() minlength: number;
  loading = false;

  constructor() { }

  isTooShortString() {
    return this.value && this.value.length < this.minlength;
  }
}
