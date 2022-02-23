import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  addPerson(name: string): Observable<any> {
    return this.http.post("http://localhost:8080/addPerson", {
      name: name
    })
  }

  getPeople(): Observable<any> {
    return this.http.get("http://localhost:8080/getPeople");
  }

  removePerson(name: string): Observable<any> {
    return this.http.post("http://localhost:8080/removePerson", {
      name: name
    })
  }

  linkPersonToEvent(name: string, title: string) {
    return this.http.post("http://localhost:8080/linkPersonToEvent", {
      name, title
    })
  }
}
