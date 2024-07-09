import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndicatorBody } from './types';

@Injectable({
  providedIn: 'root',
})
export class IndicatorsService {
  private apiUrl = 'https://greeniemetric-backend.sustentabilidadtech.lat/api/v1/';

  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');

  getPaginatedIndicator(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` });
    return this.http.get(`${this.apiUrl}indicators`, {
      headers,
    });
  }

  getIndicatorById(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` });
    return this.http.get(`${this.apiUrl}indicators/${id}`, {
      headers,
    });
  }

  getAllIndicators(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` });
    return this.http.get(`${this.apiUrl}indicators/notPag`, {
      headers,
    });
  }

  editIndicator(id: number, body: IndicatorBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` });
    return this.http.patch(`${this.apiUrl}indicators/${id}`, body, {
      headers,
    });
  }

  deleteIndicator(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` });
    return this.http.delete(`${this.apiUrl}indicators/${id}`, {
      headers,
    });
  }

  addIndicator(body: IndicatorBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` });
    return this.http.post(`${this.apiUrl}indicators`, body, {
      headers,
    });
  }
}
