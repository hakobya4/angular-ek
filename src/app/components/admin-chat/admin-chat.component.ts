import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChatService } from "src/app/services/chat.service";

@Component({
  selector: "app-admin-chat",
  templateUrl: "./admin-chat.component.html",
  styleUrl: "./admin-chat.component.css",
})
export class AdminChatComponent implements OnInit {
  allmessages: any[] = [];
  users: any[] = [];
  user: any;
  userMessages: any[] = [];
  adminChatOpen: boolean = false;
  messageInput: any = "";
  constructor(private router: Router, public chatService: ChatService) {}
  ngOnInit() {
    this.getAllMessage();
  }

  getAllMessage() {
    this.chatService.listenForMessages("1234").subscribe((messages) => {
      // Update messages when changes occur
      this.allmessages = messages;
      this.getUserId();
    });
  }
  getMessages() {
    this.chatService.getMessage(this.user).then((message) => {
      this.userMessages = message;
    });
  }

  getUserId() {
    this.allmessages.forEach((element) => {
      if (!this.users.includes(element.senderId)) {
        this.users.push(element.senderId);
      }
    });
  }
  openAdminChat(user) {
    this.user = user;
    this.adminChatOpen = true;
    this.getMessages();
  }
  public sendAdminMessage(message): void {
    this.chatService.sendAdminMessage(message, this.user);
    this.messageInput = "";
    this.getMessages();
  }
}
