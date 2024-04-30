import { Injectable } from "@angular/core";
import { Firestore, collection, collectionData } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  constructor(private fs: Firestore) {}

  public sendMessage(mesg: string) {
    let message = {};
  }

  public getMessage() {
    let messagesCollection = collection(this.fs, "messages");
    return collectionData(messagesCollection, { idField: "id" });
  }
}
