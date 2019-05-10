import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

  transform( value: any, filterString: string, propName: string ): any {
    console.log(value);
    if ( value.length === 0 || filterString === '' ) {
      return value;
    }
    const resultArray = [];
    for ( const item of value ) {
      if ( item[propName] != null ) {
        const lowerCaseLabName = item[propName].toLowerCase();
        const lowerCaseInputName = filterString.toLowerCase();
        if ( lowerCaseLabName.includes(lowerCaseInputName) ) {
          resultArray.push(item);
        }
      }
    }
    return resultArray;
  }

}
