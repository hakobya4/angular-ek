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
  senderUserId: any;
  user = sessionStorage.getItem("loggedInUser");
  private initialized: boolean = false;
  private closeInitialized: boolean = false;
  google_picture = JSON.parse(sessionStorage.getItem("loggedInUser"))?.picture;
  unreadCount: number = 0;
  confirm: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService
      .signInAnonymously()
      .then((res) => (this.senderUserId = sessionStorage.getItem("uid")))
      .catch((error) => {
        console.error("Error authenticating user anonymously:", error);
      })
      .then(() => {
        if (this.senderUserId) {
          this.listenForMessages();
          this.chatService.getMessage(this.senderUserId).then((res) => {
            if (this.messages.length === 1) {
              this.unreadCount = 1;
            }
          });
        }
      });
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
    this.chatService
      .listenForMessages(this.senderUserId)
      .subscribe((messages) => {
        // Update messages when changes occur
        this.messages = messages;
        this.unreadCount = this.chatService.countUnread;
        console.log(this.unreadCount);
        if (messages.length == 0) {
          this.chatService.sendFirstAdmin(this.senderUserId);
          this.chatService.getMessage(this.senderUserId);
        }
        if (this.initialized) {
          this.closeInitialized = true;
        }
      });
  }
  openMessage() {
    this.messageOpen = true;
    if (this.initialized) {
      this.closeInitialized = true;
    }
    this.unreadCount = 0;
  }
  closeMessage() {
    if (this.messages.length > 1) {
      this.confirm = true;
    } else {
      this.messageOpen = false;
      this.closeInitialized = false;
      this.confirm = false;
    }
  }
  confirmClose() {
    this.messageOpen = false;
    this.closeInitialized = false;
    this.confirm = false;
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
  deleteChat() {
    if (this.senderUserId) {
      this.chatService.deleteMessages(this.senderUserId);
    }
  }
}
