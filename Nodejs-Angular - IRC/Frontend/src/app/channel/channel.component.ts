import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../chat.service';

import * as moment from 'moment';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/throttleTime';
import { analyzeAndValidateNgModules } from '@angular/compiler';

interface IMessage {
    message?: string;
    created_by?: string;
    created_at?: any;
}

@Component({
    selector: 'app-root',
    templateUrl: './channel.component.html',
    styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

    /* Communication */
    message: string;
    channel: any;
    messages: IMessage[] = [];
    user: any;
    userIsAdmin: any;
    isCreator: any;
    Clients: any[] = [];
    messageClient: any[] = [];
    messagesUser: any[] = [];
    channels: any[] = [];
    NewChannel: any;
    times: string[] = [];

    /* Channel Display */
    public show: boolean = false;
    public selectedChannel: any = 'Show';

    constructor(private chatService: ChatService) {
    }
    
    ngOnInit() {
        this.channel = "general";

        this.chatService
            .createAnonyme()

        this.getPreviousMessages();

        this.getChannels();

        this.getChannelMsg();

        this.getClients();

        this.getLeavingClients();
        
        this.chatService
            .newClient()
            .distinctUntilChanged()
            .throttleTime(1000)
            .scan((acc: string, Client, index: number) =>
                Client
                , 1)
            .subscribe((Client) => {
                console.log(Client)
                this.Clients.push(Client);
            });
        this.getUsers();
    }

    sendMessage() {
        if (this.message !== '')
            this.chatService.sendMessage(this.message);
        this.message = '';
    }

    newChannel() {
        this.NewChannel = prompt('Nom du nouveau channel :');
        this.chatService.newChannel(this.NewChannel);
    }

    renameChannel(channel) {
        var newName = prompt("Nouveau nom du channel :");
        this.chatService.renameChannel(channel, newName);
        this.chatService
            .getChannels()
            .distinctUntilChanged()
            .throttleTime(1000)
            .scan((acc: string, channel, index: number) =>
                channel
                , 1)
            .subscribe((channel) => {
                this.channels = channel;
            });
    }

    switchChannel(channel) {
        this.Clients = [];
        this.chatService.switchChannel(this.channel, channel);
        this.channel = channel;
        this.messages = [];
        this.getPreviousMessages();
        // this.getClients();
    }

    getPreviousMessages() {
        this.chatService
            .getPreviousMessages()
            .distinctUntilChanged()
            .throttleTime(1000)
            .scan((acc: string, message, index: number) =>
                message
                , 1)
            .subscribe((message) => {
                this.messages = [];
                message.forEach(element => {
                    this.messages.push(element);
                });
            });
        return
    }

    deleteChannel(channel) {
        this.chatService.deleteChannel(channel);
        this.chatService
            .getChannels()
            .distinctUntilChanged()
            .throttleTime(1000)
            .scan((acc: string, channel, index: number) =>
                channel
                , 1)
            .subscribe((channel) => {
                this.channels = channel;
            });
    }

    getChannelMsg() {
        this.chatService
            .getMessages()
            .distinctUntilChanged()
            .throttleTime(1000)
            .scan((acc: string, message, index: number) =>
                message
                , 1)
            .subscribe((message) => {
                this.messages.push(message);
            });
    }

    getChannels() {
        this.chatService
            .getChannels()
            .distinctUntilChanged()
            .throttleTime(1000)
            .scan((acc: string, channel, index: number) =>
                channel
                , 1)
            .subscribe((channel) => {
                this.channels = [];
                channel.forEach(element => {
                    this.channels.push(element);
                });
            });
        return
    }

    getUsers() {
        this.chatService
            .getUsers()
            .distinctUntilChanged()
            .throttleTime(1000)
            .scan((acc: string, user, index: number) =>
            user
                , 1)
            .subscribe((user) => {
                this.user = user.username;
                this.userIsAdmin = user.is_admin;
            });
    }

    getClients() {
        this.chatService
            .getClients()
            .distinctUntilChanged()
            .throttleTime(1000)
            .scan((acc: string, message, index: number) =>
                message
                , 1)
            .subscribe((message) => {
                this.Clients.push(message);
            });
    }

    getLeavingClients() {
        this.chatService
            .getLeavingClients()
            .distinctUntilChanged()
            .throttleTime(1000)
            .scan((acc: string, message, index: number) =>
                message
                , 1)
            .subscribe((message) => {
                this.Clients.push(message);
            });
    }

    canModify(channel) {
        return this.userIsAdmin || channel.created_by == this.user;
    }
}

