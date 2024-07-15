import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getBaseUrl } from '../config';
@Injectable({
  providedIn: 'root',
})
export class EditCriterionService {
  private apiUrl = getBaseUrl();

  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');

  patchCriterion(id: number, body: EditCriterionBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` });
    return this.http.patch(`${this.apiUrl}/criteria/${id}`, body, {
      headers,
    });
  }
}

export interface EditCriterionBody {
  name: string;
  englishName: string;
  index: number;
  description: string;
  indicatorID: number;
}
