import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TokenStorage } from './token.storage';


const TOKEN_KEY = '_ixdcnorg';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private token: TokenStorage) { }

  public $userSource = new Subject<any>();

  login(email: string, password: string): Observable<any> {
    return Observable.create(observer => {

      this.http.post('/api/auth/login', {
        email,
        password
      }).subscribe((data: any) => {
        observer.next({ user: data.user });
        this.setUser(data.user, data.token);
        this.token.saveToken(data.token);
        observer.complete();
      }, error => {
        if (error.status === 401) {
          alert('Usuário ou senha inválidos');
        } else {
          alert('Ocorreu um erro na autenticação, tente novamente mais tarde.');
        }
      });

    });
  }


  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public logout() {
    localStorage.removeItem(TOKEN_KEY);
  }

  register(register): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/register', register).subscribe((data: any) => {
        observer.next({ user: data.user });
        this.setUser(data.user, data.token);
        this.token.saveToken(data.token);
        observer.complete();
      })
    }, error => {
      alert('Ocorreu um erro na criação do usuário, tente novamente mais tarde.');
    });
  }

  public getDecodedAccessToken(token: string): any {

    try {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);

    } catch (error) {
      return null;
    }

  }


  setUser(user, token): void {
    window.localStorage.setItem(TOKEN_KEY, token);
    (<any>window).user = user;
  }

  getUser(): Observable<any> {
    return this.$userSource.asObservable();
  }

  refresh() {
    return this.http.get(`api/auth/refresh`);
  }

  me(): Observable<any> {
    return Observable.create(observer => {
      const tokenVal = this.token.getToken();
      if (!tokenVal) return observer.complete();
      this.http.get('/api/auth/me').subscribe((data: any) => {
        observer.next({ user: data.user });
        this.setUser(data.user, data.token);
        observer.complete();
      })
    });
  }

  signOut(): void {
    this.token.signOut();
    this.setUser(null, null);
    delete (<any>window).user;
  }
}
