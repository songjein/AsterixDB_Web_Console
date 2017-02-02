import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
	transform(value, args:string[]) : any {
		let keys = [];

		for (let key in value) {
			console.log("=================================");
			console.log("type", typeof(value[key]));
			console.log("value", value[key]);
			console.log("=================================");

			if ( ["string", "number"].includes(typeof(value[key]))) {
				keys.push (
					{ key: key, value: value[key], type: "no" }
				);
			}
			else{
				keys.push(
					{ key: key, value: value[key], type: "ob" }
				);
			}
		}

		return keys;
	}
}
