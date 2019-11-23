import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { MyFirebaseService } from '../services/firebase/firebase.service';

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

  constructor( private _firebase: MyFirebaseService, private _data: DataService, private http: HttpClient) { }

  ngOnInit() {
  }


}
