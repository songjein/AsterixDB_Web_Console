import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router'; 
import { Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

/**
* empty component for page refreshing 
* ex) /proxy/browse => /proxy => /browse
*/
@Component({
	selector: 'proxy',
	template: `
	`,
	styles: [`
	`]
})

export class ProxyComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) { }
	
	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => { 
				var target = params['target'];
				this.router.navigate(["/" + target]);
				return target;
			} )
			.subscribe(target =>  {
				// why looping..?
				// ex) browser => b, r, o, w, e, r => error
				// so, call router navigate in switchMap :'(
			}) 
	}
}
