import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  itemsCollection: AngularFirestoreCollection<Item>;
  fireDbDoc : AngularFirestoreDocument;

   url: string = "../database/db.json"

  constructor(public fireservices:AngularFirestore,
    private http: HttpClient
             ) { }

   saveImg(){
        return this.http.get(this.url)
   }

   create_Newproduct(Record){
    return this.fireservices.collection('products').add(Record)
   }


   getProducts(){
     //return this.fireservices.collection('products').valueChanges();
      return  this.fireservices.collection('products').snapshotChanges().pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        } ))
      )



    }

   deleteProducts(item){
   this.fireDbDoc = this.fireservices.doc(`products/${item.id}`)
    this.fireDbDoc.delete();  }



}
