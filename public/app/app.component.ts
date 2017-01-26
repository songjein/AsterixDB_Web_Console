import { Component } from '@angular/core';

@Component({
	selector: 'query-console',
	template: `
		<navbar></navbar>
		<sidebar></sidebar>
		<tab-menu></tab-menu>
		<router-outlet></router-outlet>
	`
})

export class AppComponent {
}
