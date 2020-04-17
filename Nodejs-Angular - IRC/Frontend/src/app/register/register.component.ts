import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../chat.service';

@Component({
	selector: 'register-root',
	  templateUrl: './register.component.html',
	  styleUrls: ['./register.component.scss']
  })

  export class RegisterComponent implements OnInit {
	username: String;
	email: String;
	password: String;

	constructor(private chatService: ChatService) {
	}

	createUser() {
		this.chatService.createUser(this.username, this.email, this.password);
	}
	ngOnInit() {}
  }