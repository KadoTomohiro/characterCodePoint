declare module 'unicode' {
  export type UnicodeCategories = {[key in UnicodeCategory]: UnicodeMap}
  const category: UnicodeCategories
  export default category
}

type UnicodeCategory = 'Cc' |
'Zs' |
'Po' |
'Sc' |
'Ps' |
'Pe' |
'Sm' |
'Pd' |
'Nd' |
'Lu' |
'Sk' |
'Pc' |
'Ll' |
'So' |
'Lo' |
'Pi' |
'Cf' |
'No' |
'Pf' |
'Lt' |
'Lm' |
'Mn' |
'Me' |
'Mc' |
'Nl' |
'Zl' |
'Zp' |
'Cs' |
'Co'

export type UnicodeInformation = {
  value: string
  name: string
  category: string
  class: string
  bidirectional_category: string
  mapping: string
  decimal_digit_value: string
  digit_value: string
  numeric_value: string
  mirrored: string
  unicode_name: string
  comment: string
  uppercase_mapping: string
  lowercase_mapping: string
  titlecase_mapping: string
  symbol: string
}

export type UnicodeMap = { [key: number]: UnicodeInformation }
