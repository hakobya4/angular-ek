import { Component, OnInit } from "@angular/core";
import { ChatService } from "../services/chat.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit {
  messageInput: string = "";
  messages: string[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.getMessage();
  }

  public sendMessage() {}

  public getMessage() {}
}
