import { Injectable } from "@angular/core";
import {
  Firestore,
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
  onSnapshot,
  deleteDoc,
} from "@angular/fire/firestore";
import { Observable, combineLatest, map } from "rxjs";
import { getAuth, signInAnonymously } from "firebase/auth";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  user = sessionStorage.getItem("loggedInUser");
  username = JSON.parse(sessionStorage.getItem("loggedInUser"))?.name;
  adminChatSent = false;
  messages: any[] = [];
  countUnread: any = 0;
  recipientId: any;
  constructor(private fs: Firestore) {}

  signInAnonymously(): Promise<any> {
    const auth = getAuth();
    return signInAnonymously(auth)
      .then(() => {
        sessionStorage.setItem("uid", auth.currentUser.uid);
      })
      .catch((error) => {
        console.error("Anonymous authentication failed:", error);
        throw error; // Propagate the error
      });
  }
  public async sendMessage(
    mesg: string,
    recipientUserId: string
  ): Promise<any> {
    const anonymousUser = sessionStorage.getItem("uid");
    if (anonymousUser) {
      let timestamp = Timestamp.now();
      let message = {
        message: mesg,
        timestamp,
        username: this.username ? this.username : "anonymous",
        senderId: anonymousUser,
        recipientId: recipientUserId,
      };
      const messagesCollection = collection(this.fs, "messages");
      this.countUnread = 0;
      try {
        await addDoc(messagesCollection, message);
      } catch (error) {
        console.error("Error sending message:", error);
        throw error;
      }
    } else {
      console.error("User is not authenticated.");
      throw new Error("User is not authenticated.");
    }
  }
  public async sendAdminMessage(
    mesg: string,
    recipientUserId: string
  ): Promise<any> {
    let timestamp = Timestamp.now();
    let message = {
      message: mesg,
      timestamp,
      senderId: "1234",
      recipientId: recipientUserId,
    };
    const messagesCollection = collection(this.fs, "messages");
    this.countUnread += 1;
    console.log(this.countUnread);

    try {
      await addDoc(messagesCollection, message);
      this.getMessage(sessionStorage.getItem("uid"));
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
  public async sendFirstAdmin(recipientUserId: string): Promise<any> {
    let timestamp = Timestamp.now();
    let message = {
      message:
        "Hello! My name is Anahit! Please let me know if you have any questions!",
      timestamp,
      senderId: "1234",
      recipientId: recipientUserId,
    };
    this.countUnread += 1;
    const messagesCollection = collection(this.fs, "messages");
    try {
      await addDoc(messagesCollection, message);
      this.getMessage(sessionStorage.getItem("uid"));
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
  public async deleteMessages(userId: string): Promise<void> {
    const messagesQuery = query(
      collection(this.fs, "messages"),
      where("senderId", "==", userId)
    );
    const recipientQuery = query(
      collection(this.fs, "messages"),
      where("recipientId", "==", userId)
    );

    try {
      // Execute the query to retrieve the messages
      const querySnapshot = await getDocs(messagesQuery);
      const rquerySnapshot = await getDocs(recipientQuery);

      // Iterate through the messages and delete each one from the database
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      let deletedMessage = 1;
      rquerySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
        deletedMessage += 1;
      });
      this.countUnread -= deletedMessage;
    } catch (error) {
      console.error("Error deleting user messages:", error);
      throw error;
    }
  }

  public async getMessage(userId: string): Promise<any> {
    const senderQuery = query(
      collection(this.fs, "messages"),
      where("senderId", "==", userId)
    );
    const recipientQuery = query(
      collection(this.fs, "messages"),
      where("recipientId", "==", userId)
    );

    const senderQuerySnapshot = await getDocs(senderQuery);
    const recipientQuerySnapshot = await getDocs(recipientQuery);

    const senderMessages = senderQuerySnapshot.docs.map((doc) => doc.data());
    const recipientMessages = recipientQuerySnapshot.docs.map((doc) =>
      doc.data()
    );
    this.messages = [...senderMessages, ...recipientMessages].sort(
      (a, b) => a["timestamp"] - b["timestamp"]
    );
    // Merge sender and recipient messages
    return this.messages;
  }

  public listenForMessages(userId: string): Observable<any[]> {
    const senderQuery = query(
      collection(this.fs, "messages"),
      where("senderId", "==", userId)
    );
    const recipientQuery = query(
      collection(this.fs, "messages"),
      where("recipientId", "==", userId)
    );

    const senderObservable = new Observable<any[]>((observer) => {
      onSnapshot(senderQuery, (snapshot) => {
        const senderMessages = snapshot.docs.map((doc) => doc.data());
        observer.next(senderMessages);
      });
    });

    const recipientObservable = new Observable<any[]>((observer) => {
      onSnapshot(recipientQuery, (snapshot) => {
        const recipientMessages = snapshot.docs.map((doc) => doc.data());
        observer.next(recipientMessages);
      });
    });
    return combineLatest(senderObservable, recipientObservable).pipe(
      map(([senderMessages, recipientMessages]) => {
        // Merge sender and recipient messages into a single array

        if (this.messages.length > 1) {
          if (
            [...senderMessages, ...recipientMessages].sort(
              (a, b) => a["timestamp"] - b["timestamp"]
            )[[...senderMessages, ...recipientMessages].length - 1].senderId ===
            "1234"
          ) {
            this.countUnread += 1;
          }
        }
        this.messages = [...senderMessages, ...recipientMessages].sort(
          (a, b) => a["timestamp"] - b["timestamp"]
        );
        return this.messages;
      })
    );
  }
}
