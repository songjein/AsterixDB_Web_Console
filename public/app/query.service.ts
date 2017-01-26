import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

//import { Hero } from './hero';


@Injectable()
export class QueryService {

	constructor (private http: Http) { }

	getAQL(query: string): Promise<string> {
		const apiUrl = '/query_aql?query='; 

		return this.http.get(apiUrl + query)
						.toPromise()
						.then(response => response.json() )
						.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); //for demo purposes only
		return Promise.reject(error.message || error);
	}

}

