import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateCriterionService {
  private apiUrl = 'https://greeniemetric-backend.sustentabilidadtech.lat/api/v1';

  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');

  postCriterion(body: CreateCriterionBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` });
    return this.http.post(`${this.apiUrl}/criteria`, body, {
      headers,
    });
  }
}

export interface CreateCriterionBody {
  name: string;
  index: number;
  description: string;
  indicatorID: number;
}
