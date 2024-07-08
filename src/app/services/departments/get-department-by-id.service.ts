import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDepartmentByIdService {
  private apiUrl = 'https://greeniemetric-backend.sustentabilidadtech.lat/api/v1';

  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');

  getDepartmentById(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`});
    return this.http.get(`${this.apiUrl}/dptos/${id}`, {
      headers,
    });
  }
}
