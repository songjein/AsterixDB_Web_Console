import { NgModule }	from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowseComponent } from './browse.component';
import { QueryComponent } from './query.component';
import { DatatypeComponent } from './datatype.component';

const routes: Routes = [
	{ path: '', redirectTo: '/query', pathMatch: 'full' },
	{ path: 'browse', component: BrowseComponent },
	{ path: 'datatype', component: DatatypeComponent },
	{ path: 'query', component: QueryComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}
