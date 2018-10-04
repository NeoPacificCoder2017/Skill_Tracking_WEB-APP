import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(apiUrl + 'login', { email: username, password: password })
    .pipe(map(user => {
      console.log('authService login user', user);
        if (user && user.token) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
    }));
  }

  resetPassword(username: string) {
    return this.http.post<any>(apiUrl + 'password/forgot', { email: username })
    .pipe(map(user => {
      console.log('authService login user', user);
        if (user && user.token) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
    }));
  }

  resetPasswordForm(username: string, password: string, password_confirmation: string, token: string) {
    return this.http.post<any>(apiUrl + 'password/reset', { email: username, password: password, password_confirmation: password_confirmation, token: token })
    .pipe(map(user => {
      console.log('authService login user', user);
        if (user && user.token) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
    }));
  }

  logout(): boolean {
    const me = JSON.parse(localStorage.getItem('user'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + me.token
      })
    };
    localStorage.removeItem('user');
    this.http.get(apiUrl + 'logout', httpOptions)
    .pipe(map(data => {
      console.log('logout data', data);
    }));
    return true;
  }

  me() {

    const me = JSON.parse(localStorage.getItem('user'));
    return me;
  }

  isLogged() {

    const me = JSON.parse(localStorage.getItem('user'));
    console.log('isLogged', me);
    return (me) ? true : false;
  }

  getUserTypeId() {
    const me = JSON.parse(localStorage.getItem('user'));
    return me.user_type_id;
  }
}
