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

	/**
	 * send AQL query to the database
	 */
	getAQL(query: string): Promise<any> {
		const apiUrl = '/query_aql?query='; 

		return this.http.get(apiUrl + query)
						.toPromise()
						.then(response => response.json() )
						.catch(this.handleError);
	}

	/**
	 * send SQLpp query to the database
	 */
	getSQLpp(query: string): Promise<any> {
		const apiUrl = '/query_sqlpp?query='; 

		return this.http.get(apiUrl + query)
						.toPromise()
						.then(response => response.json() )
						.catch(this.handleError);
	}

	/**
	 * send DDL query to the database (AQL)
	 */
	sendDDL_AQL(query: string): Promise<any> {
		const apiUrl = '/ddl_aql?ddl='; 

		return this.http.get(apiUrl + query)
						.toPromise()
						.then(response => response)
						.catch(this.handleError);
	}

	/**
	 * send DDL query to the database (SQL++)
	 */
	sendDDL_SQL(query: string): Promise<any> {
		const apiUrl = '/ddl_sql?ddl='; 

		return this.http.get(apiUrl + query)
						.toPromise()
						.then(response => response)
						.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		return Promise.reject(error.message || error);
	}

}

