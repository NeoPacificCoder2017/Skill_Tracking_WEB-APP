import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions: any;
  me: any;

  constructor(private http: HttpClient) {
    this.setHeaders();
    console.log( this.httpOptions );
  }

  setHeaders() {
    this.me = JSON.parse(localStorage.getItem('user'));
    if (this.me) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.me.token
        })

      };
    }
  }

  get(url): any {
    return this.http.get(apiUrl + url, this.httpOptions).pipe(tap(data => document.getElementById("loadingWrapper2").style.display = 'none'));
  }

  post (url, data): any {
    return this.http.post(apiUrl + url, data, this.httpOptions).pipe(tap(data => document.getElementById("loadingWrapper2").style.display = 'none'));
  }

  upload (url, data): any {
    this.me = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.me.token
      })
    };

    return this.http.post(apiUrl + url, data, httpOptions).pipe(map(data => {return data;})).pipe(tap(data => document.getElementById("loadingWrapper2").style.display = 'none'));

  }

  put (url, data): any {
    return this.http.put(apiUrl + url, data, this.httpOptions).pipe(tap(data => document.getElementById("loadingWrapper2").style.display = 'none'));
  }

  delete (url): any {
    return this.http.delete(apiUrl + url, this.httpOptions).pipe(map(data => {return data;})).pipe(tap(data => document.getElementById("loadingWrapper2").style.display = 'none'));
  }
}
