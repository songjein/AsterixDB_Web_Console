import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { 
	PanelMenuModule, 
	TabMenuModule, 
	DataTableModule, 
	SharedModule, 
	MenuItem,
	ButtonModule,
	ToggleButtonModule,
} from 'primeng/primeng';

import { CodemirrorComponent } from './codemirror.component';

import { PrettyJsonModule } from 'angular2-prettyjson';

import { Globals }  from './globals';

import { AppComponent }  from './app.component';
import { NavbarComponent }  from './navbar.component';
import { SidebarComponent }  from './sidebar.component';
import { TabMenuComponent }  from './tab.component';
import { BrowseComponent } 	 from './browse.component';
import { QueryComponent } 	 from './query.component'; 
import { DatatypeComponent } 	 from './datatype.component'; 
import { ProxyComponent } 	 from './proxy.component';

import { QueryService } from './query.service';
import { KeysPipe } from './keys.pipe';

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
		ButtonModule,
		PrettyJsonModule,
		ToggleButtonModule,
	],

  declarations: [
		AppComponent, 
		ProxyComponent,
		NavbarComponent,
		SidebarComponent,
		TabMenuComponent,
		BrowseComponent,
		QueryComponent,
		DatatypeComponent,
		CodemirrorComponent,
		KeysPipe,
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
