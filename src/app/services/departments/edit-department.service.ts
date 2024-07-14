import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getBaseUrl } from '../config';
@Injectable({
  providedIn: 'root',
})
export class EditDepartmentService {
  private apiUrl = getBaseUrl();

  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');

  patchDepartment(id: number, body: EditDepartmentBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` });
    return this.http.patch(`${this.apiUrl}/dptos/${id}`, body, {
      headers,
    });
  }
}

export interface EditDepartmentBody {
  name: string;
  categoriesIDs: number[];
}
