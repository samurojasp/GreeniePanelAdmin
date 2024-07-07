import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}
  
  getDepartments(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(
      `${this.apiUrl}/dptos/notPag`, {
        headers,
       }
    );
  }

  getAllCategories(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}/categories`, {
      headers,
    });
  }

  getMatrix(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(
      `${this.apiUrl}/dptos/matrix`, {
        headers,
       }
    );
  }
}
