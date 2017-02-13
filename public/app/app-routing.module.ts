import { NgModule }	from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowseComponent } from './browse.component';
import { QueryComponent } from './query.component';
import { DatatypeComponent } from './datatype.component';
import { ProxyComponent } from './proxy.component';

/**
 * Define routing information between components
 */
const routes: Routes = [
	{ path: '', redirectTo: '/query', pathMatch: 'full' },
	{ path: 'proxy/:target', component: ProxyComponent},
	{ path: 'browse', component: BrowseComponent },
	{ path: 'datatype', component: DatatypeComponent },
	{ path: 'query', component: QueryComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}
