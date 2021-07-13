import { Injectable } from '@angular/core';
import unicode, {UnicodeInfo, UnicodeInfoMap} from 'unicode/category'
@Injectable({
  providedIn: 'root'
})
export class UnicodeService {
  private allUnicodeMap: UnicodeInfoMap = {}
  constructor() {
    Object.keys(unicode).forEach(category => {
      Object.assign(this.allUnicodeMap, unicode[category])
    })
  }

  getUnicodeInfo(codePoint: number): UnicodeInfo{
    return this.allUnicodeMap[codePoint]
  }
}
