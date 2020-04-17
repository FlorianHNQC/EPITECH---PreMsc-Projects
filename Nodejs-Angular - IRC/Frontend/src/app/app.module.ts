import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChatService } from 'chat.service';
import {ChannelComponent} from './channel/channel.component';
import {AppRoutingModule} from './app-routing';
import { RegisterComponent } from './register/register.component';
 
@NgModule({
  declarations: [
	AppComponent,
	ChannelComponent,
	RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
	HttpModule,
	AppRoutingModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
