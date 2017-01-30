import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router'; 
import { Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

/**
* empty template for page refreshing !
* ex) /proxy/browse => /browse
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
				console.log('target', params['target']);
				var target = params['target'];
				this.router.navigate(["/" + target]);
				return target;
			} )
			.subscribe(target =>  {
				// pass
				// why looping..?
				// ex) browser => b, r, o, w, e, r => error
				// so, call router navigate in switchMap :'(
			}) 
	}
}