import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlphaService {

  defaultproxyurl: string = "https://cors-anywhere.herokuapp.com/"
  // private autoSuggest_url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${Query}&apikey=${environment.AlphaApiKey}`

  constructor(private http: HttpClient) { }


  AutoSuggest(Query){
    let headers = new HttpHeaders();
    headers = headers.append('User-Agent', 'PostmanRuntime/7.20.1');
    headers = headers.append('Postman-Token', '17619996-b678-4a74-9190-19c037f9debf');
    return this.http.get( `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${Query}&apikey=${environment.AlphaApiKey2}`)
  }

  StockData(Query){
    return this.http.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${Query}&apikey=${environment.AlphaApiKey2}`)
  }



}
