import { Component } from '@angular/core';
import {CharacterService} from './character.service';
import {Character} from './models/character';
import {UnicodeInfo} from 'unicode/category';
import {UnicodeService} from './unicode.service';

@Component({
  selector: 'ccp-root',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <ccp-character-input (textChange)="onTextChange($event)"></ccp-character-input>
      </mat-toolbar-row>
    </mat-toolbar>
    <div class="char-container">
      <mat-card *ngFor="let char  of chars; index  as i">
        <mat-card-header>
          <mat-card-title><span class="char-shape">{{char.shape}}</span></mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-list dense>
            <mat-list-item><span class="info-title">CodePoint</span> 0x{{char.codePointBaseString('hex') | uppercase}}</mat-list-item>
            <mat-list-item><span class="info-title">UTF-8</span> 0x{{char.utf8 | uppercase}}</mat-list-item>
            <mat-list-item><span class="info-title">Category</span> {{unicodeInfoList[i].category}}({{unicodeInfoList[i].category | unicodeCategory}})</mat-list-item>
            <mat-list-item><span class="info-title">Name</span> {{unicodeInfoList[i].name}}{{unicodeInfoList[i].unicode_name}}</mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh
    }
    header {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    mat-card {
      display: flex;
      align-items: center;
    }
    mat-list-item{

    }
    .char-shape {
      font-size: 4em;
    }
    .info-title {
      font-weight: bold;
      width: 9em
    }
    .char-container {
      overflow: scroll;
    }
  `]
})
export class AppComponent {

  chars: Character[] = []
  unicodeInfoList: UnicodeInfo[]  = []

  constructor(private characterService: CharacterService, private unicodeService: UnicodeService) {
  }

  onTextChange(text: string) {
    this.chars = this.characterService.getCharacters(text)
    this.unicodeInfoList = this.chars.map(char => this.unicodeService.getUnicodeInfo(char.codePoint))
  }
}
