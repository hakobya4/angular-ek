import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewChecked,
} from "@angular/core";
import { ChatService } from "../../services/chat.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild("openChat") private messageContainer!: ElementRef;
  messageInput: any = "";
  messages: any[] = [];
  messageOpen: boolean = false;
  recipientUserId: string = "1234";
  senderUserId = sessionStorage.getItem("uid");
  user = sessionStorage.getItem("loggedInUser");
  private initialized: boolean = false;
  private closeInitialized: boolean = false;
  google_picture = JSON.parse(sessionStorage.getItem("loggedInUser"))?.picture;
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.signInAnonymously().catch((error) => {
      console.error("Error authenticating user anonymously:", error);
    });
    this.listenForMessages();
  }
  ngAfterViewChecked() {
    if (!this.initialized && this.messageContainer) {
      this.scrollToBottom();
      this.initialized = true;
    } else if (this.closeInitialized) {
      this.scrollToBottom();
      this.closeInitialized = false;
    }
  }

  public sendMessage(message): void {
    this.chatService.sendMessage(message, this.recipientUserId);
    this.messageInput = "";
  }

  private listenForMessages(): void {
    if (this.senderUserId) {
      this.chatService
        .listenForMessages(this.senderUserId)
        .subscribe((messages) => {
          // Update messages when changes occur
          this.messages = messages;
          console.log(this.messages);
          if (this.initialized) {
            this.closeInitialized = true;
          }
        });
    }
  }
  openMessage() {
    this.messageOpen = true;
    if (this.initialized) {
      this.closeInitialized = true;
    }
  }
  closeMessage() {
    this.messageOpen = false;
    this.closeInitialized = false;
  }
  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
  isSender(message: any): boolean {
    return message.senderId === this.senderUserId;
  }
  getMessageClasses(message: any): any {
    return {
      "chat-to": message.senderId === this.senderUserId,
      "chat-from": message.recipientId === this.senderUserId,
    };
  }
}
