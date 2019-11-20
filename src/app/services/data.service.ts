import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  defaultproxyurl: string = "https://cors-anywhere.herokuapp.com/"

  constructor(private http: HttpClient) { }

  getData(url) {
    return fetch( this.defaultproxyurl + url);
    
  }

 


}
