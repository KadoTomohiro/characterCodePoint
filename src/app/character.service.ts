import { Injectable } from '@angular/core';
import {Character} from './models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor() { }

  getCharacters(text: string): Character[] {
    return [...text].map(char => new Character(char))
  }
}
