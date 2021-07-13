import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {COMPOSITION_BUFFER_MODE} from '@angular/forms';
@Component({
  selector: 'ccp-character-input',
  template: `
    <mat-form-field class="example-form-field" appearance="legacy">
      <mat-label>input text here</mat-label>
      <input matInput type="text" [(ngModel)]="text" (input)="onChange()" >
      <button *ngIf="text" matSuffix mat-icon-button aria-label="Clear" (click)="clear()">
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
  `,
  styles: [
  ],
  providers: [
    { provide: COMPOSITION_BUFFER_MODE, useValue: false }
  ]
})
export class CharacterInputComponent implements OnInit {

  text: string = ''
  @Output() textChange: EventEmitter<string> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  onChange()  {
    this.textChange.emit(this.text)
  }
  clear():void {
    this.text  = ''
    this.onChange()
  }
}
