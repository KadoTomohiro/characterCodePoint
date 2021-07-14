export type CodePointBase = 'bit'  | 'dec' | 'hex'

export class Character implements Character {
  private codePointBase: {[key in CodePointBase]: number} = {
    bit: 2,
    dec: 10,
    hex: 16
  }

  private readonly _character: string
  constructor(char: string) {
    if (char.length  ===  0) {
      throw Error('empty character')
    }
    this._character = [...char][0]
  }

  public get shape(): string {
    return this._character
  }

  public get codePoint(): number {
    return this._character.codePointAt(0)!
  }

  public codePointBaseString(base: CodePointBase): string {
    return this.codePoint.toString(this.codePointBase[base])
  }

  public get utf8(): string {
    const codePoint = this.codePoint
    const codeUnit: number  = Character.getCodeUnit(codePoint);
    const binaries = this.getUtf8Binary(codeUnit)
    return Number.parseInt(binaries, 2).toString(16)
  }

  private getUtf8Binary(codeUnit: number): string {
    const prefixesFirstBinary: { [key: number]: string } = {
      1: '0',
      2: '110',
      3: '1110',
      4:  '11110'
    }
    const prefixSubsequentBinary = '10'
    const prefixFirstBinary = prefixesFirstBinary[codeUnit]
    const binary = this.codePointBaseString('bit');

    if (codeUnit === 1) {
      return `${prefixFirstBinary}${binary}`
    }
    const binaries = Character.reverseString(binary)
      .match(/.{1,6}/g)!
      .map(Character.reverseString)
      .reverse()
    const zeroFillLength = 8 - prefixFirstBinary.length
    binaries[0] = binaries[0].padStart(zeroFillLength, '0')
    return `${prefixFirstBinary}${binaries.join(prefixSubsequentBinary)}`
  }

  private static reverseString(str: string) {
    return [...str]
      .reverse()
      .join('');
  }

  private static getCodeUnit(codePoint: number): number {
    let codeUnit: number
    if (codePoint < 0x80) { // 1000 0000
      codeUnit = 1;
    } else if (codePoint < 0x800) {  // 1000 0000 0000
      codeUnit = 2;
    } else if (codePoint < 0x10000) { // 0001 0000 0000 0000 0000
      codeUnit = 3;
    } else if (codePoint < 110000) {
      codeUnit = 4;
    } else {
      throw new Error('out of range unicode')
    }
    return codeUnit
  }
}
