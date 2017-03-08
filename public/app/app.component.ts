import { Component } from '@angular/core';

/**
 * Root component
 * Defines our application's layout
 */
@Component({
	selector: 'query-console',
	template: `
		<navbar></navbar>
		<div style="width:15%; float:left; padding-top: 50px;">
			<sidebar></sidebar>
		</div>
		<div style="width:80%; float:left; overflow:auto; padding: 10px; ">
			<tab-menu></tab-menu>
			<div style="height:3px;"></div>
			<router-outlet></router-outlet>
		</div>
	`
})

export class AppComponent {
}
