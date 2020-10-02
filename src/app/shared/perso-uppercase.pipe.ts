import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'printInitials'
})
export class PersoUppercasePipe implements PipeTransform {

  transform(value: string): string {
    return value.split(' ').map( value => value.charAt(0).toUpperCase()).join('')
  }

}