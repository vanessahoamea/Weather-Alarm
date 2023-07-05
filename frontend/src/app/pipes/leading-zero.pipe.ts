import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leadingZero'
})
export class LeadingZeroPipe implements PipeTransform {

  transform(value: number): string {
    if(value < 10)
      return '0' + value.toString();
    return value.toString();
  }

}
