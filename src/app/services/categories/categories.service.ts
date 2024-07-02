import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorieBody } from './types';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}categories/notPag`, {
      headers,
    });
  }

  getPaginatedCategories(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}categories`, {
      headers,
    });
  }

  getCategorieById(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}categories/${id}`, {
      headers,
    });
  }

  editCategorie(id: number, body: CategorieBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${this.apiUrl}categories/${id}`, body, {
      headers,
    });
  }

  deleteCategorie(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.apiUrl}categories/${id}`, {
      headers,
    });
  }

  addCategorie(body: CategorieBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}categories`, body, {
      headers,
    });
  }

  getAllCriteria(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}criteria`, {
      headers,
    });
  }

  getAllIndicators(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}indicators`, {
      headers,
    });
  }
}
