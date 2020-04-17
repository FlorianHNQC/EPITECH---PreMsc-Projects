import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { leave } from '@angular/core/src/profile/wtf_impl';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

export class ChatService {
    private url = 'http://localhost:8080';
    private socket;
    private pseudo;
    public userConnected;
    public history = [];
    private router: Router;

    constructor() {
        this.socket = io(this.url);
        this.socket.emit('get-channels');
    }

    public switchChannel(previousChannel, channel) {
        this.socket.emit('leave-channel', previousChannel);
        this.socket.emit('join-channel', channel);
    }
    
    public getClients = () => {
        return Observable.create((observer) => {
            this.socket.on('join-channel', (message) => {
                observer.next(message);
            });
        });
    }

    public getLeavingClients = () => {
        return Observable.create((observer) => {
            this.socket.on('leave-channel', (message) => {
                observer.next(message);
            });
        });
    }

    public createAnonyme() {
        while (!this.pseudo) {
            this.pseudo = prompt("Veuillez entrer votre pseudo");
            this.socket.emit('nouveau_client', this.pseudo);
            this.socket.emit('join-channel', 'general');
            this.newClient();
            
            // this.welcomeNewClient();
        };
    }

    public newClient = () => {
        return Observable.create((observer) => {
            this.socket.on('nouveau_client', (Client) => {
                observer.next(Client);
            });
        });
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public newChannel(channel) {
        console.log("chatservice: ", channel)
        this.socket.emit('new-channel', channel);
        this.socket.emit('get-channels');
    }

    public deleteChannel(channel) {
        console.log("chatservice: ", channel)
        this.socket.emit('delete-channel', channel);
        this.socket.emit('get-channels');
    }

    public renameChannel(channel, newName) {
        console.log("chatservice: ", channel)
        this.socket.emit('rename-channel', channel, newName);
        this.socket.emit('get-channels');
    }

    public userConnexion(email, password) {
        var myuser = {
            email: email,
            password: password,
        }
        console.log("user: ", myuser)
        this.socket.emit('login', myuser);
        this.getUsers();
    }

    public getUsers = () => {
        return Observable.create((observer) => {
            this.socket.on('login', (User) => {
                observer.next(User);
            });
        });
    }

    public createUser(username, email, password) {
        var user = {
            username: username,
            email: email,
            password: password
        }
        this.socket.emit('register', user);
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }

    public getPreviousMessages = () => {

        this.socket.emit('prev-msgs');
        return Observable.create((observer) => {
            this.socket.on('prev-msgs', (message) => {
                observer.next(message);
            });
        });
        // setTimeout( () => {
        //     return this.history
        //     }, 3000
        // );
    }

    public returnHistory = () => {
        return this.history
    }

    public getChannels = () => {
        return Observable.create((observer) => {
            this.socket.on('get-channels', (channel) => {
                observer.next(channel);
                console.log("chat.service: ", channel);
            });
        });
    }
}