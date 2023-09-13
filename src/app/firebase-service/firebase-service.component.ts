import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, addDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-firebase-service',
  templateUrl: './firebase-service.component.html',
  styleUrls: ['./firebase-service.component.scss']
})
export class FirebaseServiceComponent {
  firestore: Firestore = inject(Firestore);
  items$;
  items;
  unsubList;
  unsubSingle;

  constructor() {

  }


  async addItem(item: {}) {
    let docRef = await addDoc(this.getGameRef(), item).catch((error) => {
      console.log(error);
    })
    return docRef;
  }


  getGameRef() {
    return collection(this.firestore, 'games');
  }

  async getSingleDocRef(colId:string, docId: string) {
    let docRef = doc(collection(this.firestore, colId), docId);
    let docSnap = await getDoc(docRef);
    return docSnap;
  }

  getDocRef(colId:string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  async updateGame(colId:string, docId:string, gameAsJson: {}) {
    await updateDoc(this.getDocRef(colId, docId), gameAsJson).catch((error) => {
      console.log(error);

    })
  }
}
