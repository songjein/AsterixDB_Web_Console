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
	MenuItem 
} from 'primeng/primeng';

import { CodemirrorComponent } from './codemirror.component';

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
		ProxyComponent,
		NavbarComponent,
		SidebarComponent,
		TabMenuComponent,
		BrowseComponent,
		QueryComponent,
		DatatypeComponent,
		CodemirrorComponent,
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
