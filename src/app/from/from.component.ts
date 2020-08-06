import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { fileURLToPath } from 'url';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { TagContentType } from '@angular/compiler';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.scss']
})
export class FromComponent implements OnInit {

  ref:AngularFireStorageReference;
  task:AngularFireUploadTask

  product:string;
 file;
 productName;
 productPrice;
 message:string;
 products;
  reader: string | ArrayBuffer;
  Image: string | ArrayBuffer;

  constructor(public crudsrvice:CrudService, public storage:AngularFireStorage) {


  }

  CreateRecord(){
  let Record ={};
  Record['name'] = this.productName;
  Record['price'] = this. productPrice;
  Record['image'] = this.Image;

  this.crudsrvice.create_Newproduct(Record).then(res =>{

    this.productName;
    this.productPrice;
    this.Image;
    console.log(res);
    this.message = "product data save Done";

    }).catch(error => {
      console.log(error);
    })
  }

  ngOnInit(){

  }

  getProducts(){
    this.crudsrvice.getProducts().subscribe(items =>{
    this.products =  items

    })
  }

  deleteProduct(item){
    this.crudsrvice.deleteProducts(item)
   console.log('here look here ',item)
  }

  fileSelected(e){
    this.file = e.srcElement.files[0]
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = (x) => {
         this.reader =  fileReader.result
         this.Image = this.reader

    }

    fileReader.readAsDataURL(this.file)

    }

  upload(){

  }




}
