import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unicodeCategory'
})
export class UnicodeCategoryPipe implements PipeTransform {
  categoryMap: {[key: string]: string} = {
    'Cc': 'Control',
    'Cf': 'Format',
    'Co': 'Private Use',
    'Cs': 'Surrrogate',
    'Ll': 'Lowercase Letter',
    'Lm': 'Modifier Letter',
    'Lo': 'Other Letter',
    'Lt': 'Titlecase Letter',
    'Lu': 'Uppercase Letter',
    'Mc': 'Spacing Mark',
    'Me': 'Enclosing Mark',
    'Mn': 'Nonspacing Mark',
    'Nd': 'Decimal Number',
    'Nl': 'Letter Number',
    'No': 'Other Number',
    'Pc': 'Connector Punctuation',
    'Pd': 'Dash Punctuation',
    'Pe': 'Close Punctuation',
    'Pf': 'Final Punctuation',
    'Pi': 'Initial Punctuation',
    'Po': 'Other Punctuation',
    'Ps': 'Open Punctuation',
    'Sc': 'Currency Symbol',
    'Sk': 'Modifier Symbol',
    'Sm': 'Math Symbol',
    'So': 'Other Symbol',
    'Zl': 'Line Separator',
    'Zp': 'Paragraph Separator',
    'Zs': 'Space Separator',
  }
  transform(value: unknown): unknown {
    if (typeof value !== 'string') return value
    return this.categoryMap[value] ?? value;
  }

}
