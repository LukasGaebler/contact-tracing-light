import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get("http://localhost:8080/getEvents")
  }

  addEvent(title:any, date:any): Observable<any> {
    return this.http.post("http://localhost:8080/addEvent", {title, date});
  }

  removeEvent(title:any): Observable<any> {
    return this.http.post("http://localhost:8080/removeEvent", {title});
  }
}
