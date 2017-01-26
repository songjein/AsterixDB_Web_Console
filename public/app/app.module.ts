import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
		AppRoutingModule
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
		QueryService	
	],
	
  bootstrap: [ AppComponent ]
})

export class AppModule { }
