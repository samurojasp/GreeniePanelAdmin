import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorieBody } from './types';
import { getBaseUrl } from '../config';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = getBaseUrl();

  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');

  getAllCategories(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiUrl}/categories`, {
      headers,
    });
  }

  getPaginatedCategories(page: number, take: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(
      `${this.apiUrl}/categories/paginated?page=${page}&take=${take}`,
      {
        headers,
      }
    );
  }

  getCategorieById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiUrl}/categories/${id}`, {
      headers,
    });
  }

  editCategorie(id: number, body: CategorieBody): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.patch(`${this.apiUrl}/categories/${id}`, body, {
      headers,
    });
  }

  deleteCategorie(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.delete(`${this.apiUrl}/categories/${id}`, {
      headers,
    });
  }

  addCategorie(body: CategorieBody): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`${this.apiUrl}/categories`, body, {
      headers,
    });
  }

  getAllCriteria(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiUrl}/criteria/notPag`, {
      headers,
    });
  }

  getAllIndicators(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiUrl}/indicators`, {
      headers,
    });
  }
}
