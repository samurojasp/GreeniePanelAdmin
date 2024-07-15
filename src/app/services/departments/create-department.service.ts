import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getBaseUrl } from '../config';
@Injectable({
  providedIn: 'root',
})
export class CreateDepartmentService {
  private apiUrl = getBaseUrl();

  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');

  postDepartment(body: CreateDepartmentBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` });
    return this.http.post(`${this.apiUrl}/dptos`, body, {
      headers,
    });
  }
}

export interface CreateDepartmentBody {
  name: string;
  categoriesIDs: number[];
}
