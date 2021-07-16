import { Injectable } from '@angular/core';
import { unicodeDictionary } from 'src/app/unicode-dictionary/allUnicodeCharacters'
import {UnicodeInformation, UnicodeInformationMap} from './models/UnicodeInformation';
@Injectable({
  providedIn: 'root'
})
export class UnicodeService {
  private readonly allUnicodeMap: UnicodeInformationMap
  constructor() {
    this.allUnicodeMap = unicodeDictionary
  }

  getUnicodeInfo(codePoint: number): UnicodeInformation{
    return this.allUnicodeMap[codePoint]
  }
}
