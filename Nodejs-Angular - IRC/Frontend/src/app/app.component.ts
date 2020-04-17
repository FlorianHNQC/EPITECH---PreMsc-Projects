import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  email: String;
	password: String;

	constructor(private chatService: ChatService) {
	}
	
	userConnexion() {
    this.chatService.userConnexion(this.email, this.password);
    document.getElementById('id01').style.display='none';
    
	}
	
    ngOnInit() {
       
    }

   
}

