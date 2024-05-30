import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddIndicatorService {
  private apiUrl = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) {}

  createindicator(body: CreateIndicatorBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}indicators`,body, {
      headers,
    });
  }
}

export interface CreateIndicatorBody {
  name: string;
  index: number;
  description: string;
}