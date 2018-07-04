import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  httpOptions : any;
  me : any;

  constructor(private http: HttpClient) {
    this.setHeaders();
  }

  setHeaders() {
    this.me = JSON.parse(localStorage.getItem('user'));
    if(this.me) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer '+ this.me.token
        })
      };
    }
  }
  
  get(url): any {
    return this.http.get(apiUrl + url, this.httpOptions);
  }

  post (url, data): any {
    return this.http.post(apiUrl + url, data, this.httpOptions);
  }

  put (url, data): any {
    return this.http.put(apiUrl + url, data, this.httpOptions);
  }

  delete (url): any {
    return this.http.delete(apiUrl + url, this.httpOptions);
  }
}
