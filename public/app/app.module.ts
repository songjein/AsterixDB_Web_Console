import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { PanelMenuModule, TabMenuModule, DataTableModule, SharedModule, MenuItem } from 'primeng/primeng';

import { Globals }  from './globals';

import { AppComponent }  from './app.component';
import { NavbarComponent }  from './navbar.component';
import { SidebarComponent }  from './sidebar.component';
import { TabMenuComponent }  from './tab.component';
import { BrowseComponent } 	 from './browse.component';

import { QueryService } from './query.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [ 
		BrowserModule, 
		FormsModule,
		HttpModule,
		AppRoutingModule,
		PanelMenuModule,
		RouterModule.forRoot([]),
		TabMenuModule,
		DataTableModule,
		SharedModule,
	],

  declarations: [
		AppComponent, 
		NavbarComponent,
		SidebarComponent,
		TabMenuComponent,
		BrowseComponent,
	],

	/**
	* a singleton QueryService instance
	*/
	providers: [
		QueryService,
		Globals
	],
	
  bootstrap: [ AppComponent ]
})

export class AppModule { }
