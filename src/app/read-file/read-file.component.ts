import { Component, OnInit, EventEmitter, Output, SimpleChanges, OnChanges, Input } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-read-file',
  templateUrl: './read-file.component.html',
  styleUrls: ['./read-file.component.css']
})
export class ReadFileComponent implements OnChanges {
products;
public cartItem;

 selectPro = [];
 total:number;


constructor(public crudsrvice:CrudService){}

ngOnChanges(changes:SimpleChanges){
  console.log(changes)
  changes.selectPro
}

ngOnInit(){
  this.getProducts()

}

getProducts(){
  this.crudsrvice.getProducts().subscribe(items =>{
  this.products =  items

  })
}

    addToCart(item){
      this.selectPro.push(item)
      let sum = 0
    for(let a of this.selectPro){

      sum += Number(a.data.price)
      this.total = sum
    }
    }


  remove(i:number,item){
    this.selectPro.splice(i,1)
    this.total -= parseInt(item.data.price)
     console.log(this.total)
 }


 loaadData(){
  console.log(this.selectPro);
 }


}


