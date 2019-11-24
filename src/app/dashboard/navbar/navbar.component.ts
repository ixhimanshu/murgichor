import { Component, OnInit } from '@angular/core';
import { AlphaService } from 'src/app/services/Alpha/alpha.service';
import { StateService } from '../services/states/state.service';
// import swal from 'sweetalert';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private auto_suggest: any = '';
  suggested_data:Array<any> = [];

  constructor(private _alpha: AlphaService, private _state: StateService) { }

  ngOnInit() {
    // this.onAutoSuggest();
  }

  onManualSelection(auto_suggest){
    this._state.sendMessage(auto_suggest, auto_suggest );
  }

  onSelectStock(symbol,name){
    console.log(symbol);
    let r = symbol.substring(symbol.length, symbol.length-3);
    let s = symbol.substring(0, symbol.length-3);
    if( r === 'NSE' ) {
      let re_symbol = s + 'NS';
      this._state.sendMessage(re_symbol, name);
    } else if ( r === 'BSE') {
      let re_symbol = s + 'BO';
      this._state.sendMessage(re_symbol, name);
    } else {
      // swal( 'Not supported stock type', '', 'error' )
    }
    console.log(r);

    // this.onStockData(val);
    this.suggested_data = [];
    this.auto_suggest = '';
    
  }


  onStockData(val){
     this._alpha.StockData(val)
     .subscribe( (res:any) => {
      console.log(res);
      console.log(res[0]);

      Object.values(res).map( (e, index) => {
        if(index>0){
          
          Object.values(e).forEach( (i) => {
            console.log(i);
            let a = [];
            var data:any = Object.values( i );
             if( (data[1] - data[0] ) > data[0]/100) {
                  console.log('win');
             }

            
          } )
        }
        this.suggested_data = [];
        
      } )
      
     } )
  }


  onAutoSuggest($event){
    this.suggested_data = [];
    if($event.target.value.length > 2){
      this._alpha.AutoSuggest($event.target.value)
      .subscribe( (res: any) => {
        res.bestMatches.forEach(e => {
           var values = Object.values( e );
           if ( values[3] === "India/NSE" ||  values[3] === "India/Bombay" ) {
              this.suggested_data.push({
                'name': `${values[1]}`,
                'region': `${values[3]}`,
                'symbol': `${values[0]}`
              })
           }
          
           
        });
        console.log( res.bestMatches);
      } )
    } 
  }

}
