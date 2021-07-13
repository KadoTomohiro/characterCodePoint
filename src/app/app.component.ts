import { Component } from '@angular/core';
import {CharacterService} from './character.service';
import {Character} from './models/character';

@Component({
  selector: 'ccp-root',
  template: `
    <header>
      <ccp-character-input (textChange)="onTextChange($event)"></ccp-character-input>
    </header>
    <mat-accordion>
        <mat-expansion-panel *ngFor="let char  of chars; index  as i">
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{char.shape | uppercase}}
            </mat-panel-title>
            <mat-panel-description>
              CodePoint: 0x{{char.codePointBaseString('hex')}}
            </mat-panel-description>
            <mat-panel-description>
              UTF-8: 0x{{char.utf8 | uppercase}}
            </mat-panel-description>
          </mat-expansion-panel-header>
          <p>
          </p>
        </mat-expansion-panel>

    </mat-accordion>
  `,
  styles: [`
    header {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `]
})
export class AppComponent {

  chars: Character[] = []

  constructor(private characterService: CharacterService) {
  }

  onTextChange(text: string) {
    this.chars = this.characterService.getCharacters(text)
  }
}
