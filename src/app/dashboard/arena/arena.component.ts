import { Component, OnInit } from '@angular/core';
import { MyFirebaseService } from 'src/app/services/firebase/firebase.service';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../services/states/state.service';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent implements OnInit {

  defaultproxyurl: string = "https://cors-anywhere.herokuapp.com/"
  string: string;
  AllResults:any = [];
  results:any = [];
  highOpen:any = [];
  lastClose:any;
  count:number = 0;
  selected_stock_symbol:any;
  selected_stock_name:any;
  active_watchlist: any = 'Watchlist1'

  counter:any = 0;

  visible_data:any = [];

  payload:any = [];


  constructor( private _state: StateService, private _firebase: MyFirebaseService) { 
      this._state.getMessage()
      .subscribe( (m) => {
        console.log(m);
        this.onStockData(m.stockName);
        this.selected_stock_name = m.val;
        this.selected_stock_symbol = m.stockName;
      } )
   }

  ngOnInit() {
    this._firebase.getStockData()
    .subscribe( (res:any) => {
      console.log(res);
      this.visible_data = res;
    } )
  }

  onDelete(d){
    console.log(d);
    this._firebase.deleteStock(d)
    .then( res => console.log(res)
     )
    
  }

  onStockData(e){
    fetch(this.defaultproxyurl + `https://in.finance.yahoo.com/quote/${e}/history?`)
    .then( res => res.text() )
      .then( (res) => {

        this.results = [];
        this.AllResults = [];
        this.counter = 0;
        
        this.string = res;
            var start =  this.string.lastIndexOf(`HistoricalPriceStore":`);
            var end = this.string.lastIndexOf(`,"isPending`);
            var usefulData =   this.string.substring(start + 32, end);

            this.AllResults = JSON.parse(usefulData);

            var ary = [7, 22, 60, 120, 240]
            ary.forEach(element => {
              var counter = 0;
              this.results = [];
              console.log(this.results, this.counter);
              
              
              // this.results = [];
              this.results =  this.AllResults.splice(0, element)
              this.results.forEach(i => {
                var e = i.high - i.open;
                if( e  > ((i.open * 0.75)/100) ) {
                  this.counter = this.counter + 1;
                  
                  return this.counter;
                }
               
               })
               console.log( this.counter, 'element', element, (this.counter/this.results.length)*100, this.results.length);
               this.payload.push((this.counter/this.results.length)*100);
              //  var e = 0;
              //  var counter = 0;
               console.log(this.payload);  
               this.counter = 0;
               this.results = [];
            });

            console.log('last', this.AllResults, this.AllResults[this.AllResults.length - 1]);
            this._firebase.sendMessage(this.selected_stock_name, this.selected_stock_symbol,
               'not implemented', this.payload[0],  this.payload[1],  this.payload[2],
               this.payload[3],  this.payload[4], this.active_watchlist )
               .then( (res:any) => {
                  console.log(res, res.id);

                  this._firebase.patchStcokId(res.id)
                  .then( (res) => {
                    this.payload = [];
                    console.log('last res', res);
                    this.ngOnInit();
                    
                  } )
                  
               } )
            
           })
  }
                  
    
  

}
