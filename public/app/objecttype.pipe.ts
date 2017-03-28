import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'isObject'})
export class ObjectTypePipe implements PipeTransform {
  transform(value, args:string[]) : any {
		return value && (value.constructor.toString().indexOf("Object") != -1);
  }
}
