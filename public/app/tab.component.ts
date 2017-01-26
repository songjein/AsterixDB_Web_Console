import { Component } from '@angular/core';

import { TabMenuModule, MenuItem } from 'primeng/primeng';

@Component({
	moduleId: module.id,
	selector: 'tab-menu',
	template: `
		<p-tabMenu [model]="items" [activeItem]="activeItem"></p-tabMenu>
	`,
	styles: [`
		p-tabMenu{
			float:left;		
		}
	`]
})

export class TabMenuComponent {
	private items: MenuItem[];
	private activeItem: MenuItem;

	ngOnInit() {
		this.items = [
			{ label: 'Browse', icon: 'fa-table' },
			{ label: 'Query', icon: 'fa-terminal' }
		];

		this.activeItem = this.items[0];
	}
}
