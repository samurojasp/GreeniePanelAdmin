import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetPaginatedIndicatorService {
  private apiUrl = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) {}

  getPaginatedIndicator(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}indicators`, {
      headers,
    });
  }
}