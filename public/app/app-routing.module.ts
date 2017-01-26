import { NgModule }	from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowseComponent } from './browse.component';

const routes: Routes = [
	//{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	//{ path: 'dashboard', component: DashboardComponent },
	//{ path: 'detail/:id', component: HeroDetailComponent },
	{ path: 'browse', component: BrowseComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}
