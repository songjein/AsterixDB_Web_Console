import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

/**
 * query service
 * send query parameter to the database 
 * and return the result
 */
@Injectable()
export class QueryService {

	constructor (private http: Http) { }

	/*
	 * send AQL query to the database
	 **/
	getAQL(query: string): Promise<any> {
		const apiUrl = '/query_aql?query='; 

		return this.http.get(apiUrl + query)
						.toPromise()
						.then(response => response.json() )
						.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		return Promise.reject(error.message || error);
	}

}

