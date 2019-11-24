import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import * as firebase from "firebase";

import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class MyFirebaseService {
  booksCollectionRef: any;
  books: any;
  dateInit: any = new Date().getTime();
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  counter: number;
  timeZone: any;

  constructor(
    private afStorage: AngularFireStorage,
    public fireStore: AngularFirestoreModule,
    public db: AngularFirestore
  ) {
    
  }

  sendMessage(name, symbol, cat, week, month,quater, half_year, year, watchlist ){
    return this.db.collection("Stocks")
    .add({
      name: name,
      symbol: symbol,
      category: cat,
      week: week,
      month: month,
      quater: quater,
      half_year: half_year,
      year: year,
      watchlist: watchlist
      // price: price
    });
  }

  getStockData(){
    const msgRef = this.db
    .collection("Stocks")

  // var ref = firebase.database().ref("Rooms");
  // console.log('msg from fire service', roomRef)
  return msgRef.valueChanges();
  }



  deleteStock(id){
      return this.db
        .collection("Stocks")
        .doc(id)
        .delete();
  }


  patchStcokId(stockID) {
    console.log('reassign log', stockID);
   return this.db
      .collection("Stocks")
      .doc(stockID)
      .update({
        'stockID': stockID
      })
  }


  // old data















  updateUnreadCount(roomId, count) {
    this.db
      .collection("Rooms")
      .doc(roomId)
      .update({
        UnreadCount: count
      })
      .then(res => console.log("res from firebase", res));
  }

  SetUnreadCount(roomId) {
    this.db
      .collection("Rooms")
      .doc(roomId)
      .update({
        UnreadCount: this.counter++
      })
      .then(res => console.log(res));
  }

  GetUnreadCount(roomId) {
    let href = this.db.collection("Rooms").doc(roomId);
    return href.get();
  }

  patchLastSeen(roomId) {
    let dateInit = new Date().getTime();
    this.db
      .collection("Rooms")
      .doc(roomId)
      .update({
        last_seen: new Date(dateInit - 3600000 * 5.5)
      });

    this.db
      .collection("Rooms")
      .doc(roomId)
      .update({
        UnreadCount: 0
      });

    this.counter = 0;
  }

  patchChatRoomAgent(roomId, agentName, agentId) {
    console.log('reassign log', roomId, agentName, agentId);
    this.db
      .collection("Rooms")
      .doc(roomId)
      .update({
        agent_name: agentName,
        agent_id: agentId
      })
      .then( res => {
        console.log('reassign log', res);
        
      } )
  }

  patchRoom(roomId) {
    this.db
      .collection("Rooms")
      .doc(roomId)
      .update({
        is_open: false
      });
  }

  deleteRoom(roomId) {
    return this.db
      .collection("Rooms")
      .doc(roomId)
      .delete();
  }

  deleteStorage(roomId) {
    return firebase.storage().ref('/Rooms/' + roomId + '/').delete();
  }

  updateRoomId(roomId) {
    this.db
      .collection("Rooms")
      .doc(roomId)
      .update({
        room_id: roomId
      });
  }

  updateTicketId(TicketId, roomId) {
    this.db
      .collection("Rooms")
      .doc(roomId)
      .update({
        ticket_id: TicketId
      });
  }

  getMsg(roomID) {
    const msgRef = this.db
      .collection("Rooms")
      .doc(roomID)
      .collection("Message");

    var ref = firebase.database().ref("Rooms");
    // console.log('msg from fire service', roomRef)
    return msgRef.valueChanges();
  }

  

  createCollection(agent_id, customer_id, agent_name) {
    let date = new Date();

    this.db
      .collection("Rooms")
      .doc(sessionStorage.getItem("RoomId"))
      .collection("Message")
      .add({
        msg_id: "",
        msg: "Hello, How can I help you?",
        created_at: date.getTime(),
        msg_type: 1,
        attachment_url: "",
        from_id: agent_id,
        from_name: agent_name,
        to_id: customer_id,
        to_name: "",
        file_name: "",
        file_type: "",
        read_status: false
      })
      .then((res: any) => {
        console.log(res);
      });
  }

  sendAttachment(file) {
    const ref = firebase.storage().ref();
    ref.child(name).put(file);
  }

  getAvatars() {
    return this.db.collection("/avatar").valueChanges();
  }

  getUser(userKey) {
    return this.db
      .collection("users")
      .doc(userKey)
      .snapshotChanges();
  }

  updateUser(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db
      .collection("users")
      .doc(userKey)
      .set(value);
  }

  deleteUser(userKey) {
    return this.db
      .collection("users")
      .doc(userKey)
      .delete();
  }

  searchUsers(searchValue) {
    return this.db
      .collection("users", ref =>
        ref
          .where("nameToSearch", ">=", searchValue)
          .where("nameToSearch", "<=", searchValue + "\uf8ff")
      )
      .snapshotChanges();
  }

  searchUsersByAge(value) {
    return this.db
      .collection("users", ref => ref.orderBy("age").startAt(value))
      .snapshotChanges();
  }

  
}