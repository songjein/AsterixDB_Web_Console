import { Component } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'test-app',
	templateUrl: 'test.html'
})

export class AppComponent {
	test = "test";
	
	constructor(){}
}
