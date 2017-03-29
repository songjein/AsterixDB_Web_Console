import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'isObjectArray'})
export class ObjectArrayTypePipe implements PipeTransform {
  transform(value, args:string[]) : any {
		return value && (value.constructor.toString().indexOf("Array") != -1) 
					&& value[0] && (value[0].constructor.toString().indexOf("Object") != -1);
  }
}
