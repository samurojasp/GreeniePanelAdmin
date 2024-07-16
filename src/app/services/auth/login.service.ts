import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getBaseUrl } from '../config';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = getBaseUrl();

  constructor(private http: HttpClient) {}

  postLogin(body: LoginBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/auth/login`, body, {
      headers,
    });
  }

  getUserRole(): string {
    const role = localStorage.getItem('role');
    return role!;
  }
}

interface LoginBody {
  email: string;
  password: string;
}
