export type UnicodeInformation = {
  codePoint: string
  name: string[]
  block: string
  category: string
}

export type UnicodeInformationMap = {[key: number]: UnicodeInformation}
