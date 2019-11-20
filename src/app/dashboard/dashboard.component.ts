import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  defaultproxyurl: string = "https://cors-anywhere.herokuapp.com/"
  string: string;
  results:any = [];
  highOpen:any = [];
  lastClose:any;
  count:number = 0;
  winRate:any = [];
  samplePayload22:any = ['AUROPHARMA','BHARTIARTL','UCOBANK', 'PNB', 'YESBANK',  'HCL-INSYS', 'IDEA', 'RCOM', 'RPOWER', 'RELINFRA']

  samplePayload2:any = [ 'TATAMOTORS', 'VIMTALABS', 'TEJASNET', 'VEDL', 'IOC', 'GAIL', 'WIPRO']
  last24Days80:any = ['ASTEC']
  samplePayload:any = [ 'HCL-INSYS' ]
  winRate24: any;

  constructor( private _data: DataService, private http: HttpClient) { }

  ngOnInit() {

    // this.updateStockList()

    this.samplePayload.forEach(e => {
      fetch(this.defaultproxyurl + `https://in.finance.yahoo.com/quote/${e}.BO/history?`)
        .then( res => res.text() )
          .then( (res) => {
            this.string = res;
                var start =  this.string.lastIndexOf(`HistoricalPriceStore":`);
                var end = this.string.lastIndexOf(`,"isPending`);
                var usefulData =  this.string.substring(start+22, end  ) + '}';
                this.results = JSON.parse(usefulData).prices.splice(0,15)

                console.log(this.results);
                
  
  
                this.results.forEach(element => {
                  var e = element.high - element.open;
                
                  
                  if( e  > element.open/100 ) {
                    console.log( 'element', e, element.high, element.open, 'ele/100', element.open/100);
                    console.log('1');
                    
                    this.count = this.count + 1;
                    return this.count;
                  }
                
                  
              }
              )

              console.log(this.count, this.results.length);
              

              this.winRate.push((this.count/this.results.length)*100);

              //  this.winRate24.push((this.count/this.results.length)*100);
            
              console.log((this.count/this.results.length)*100);

              
          

              this.count = 0;
              this.results = [];
                    })
                  });
    
  }

  compute(){
  
   
  }



  updateStockList(){
    // this.http.post('../../assets/stockNames.json', 'RELIANCE')
    // .subscribe( res => console.log(res))
     
  }



}
