import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getBaseUrl } from '../config';
@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  private apiUrl = getBaseUrl();

  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');

  getPaginatedDepartments(page: number, take: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` });
    return this.http.get(
      `${this.apiUrl}/dptos?order=ASC&page=${page}&take=${take}`,
      {
        headers,
      }
    );
  }

}
