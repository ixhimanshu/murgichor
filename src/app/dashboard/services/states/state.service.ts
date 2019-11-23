import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private subject = new Subject<any>();

  constructor() { }


  
  sendMessage(stockName: any, val:any) {
    this.subject.next({ stockName, val });
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }



}
