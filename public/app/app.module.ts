import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { PanelMenuModule,MenuItem } from 'primeng/primeng';

import { Globals }  from './globals';

import { AppComponent }  from './app.component';
import { NavbarComponent }  from './navbar.component';
import { SidebarComponent }  from './sidebar.component';

import { QueryService } from './query.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [ 
		BrowserModule, 
		FormsModule,
		HttpModule,
		AppRoutingModule,
		PanelMenuModule,
		RouterModule.forRoot([])
	],

  declarations: [
		AppComponent, 
		NavbarComponent,
		SidebarComponent
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
