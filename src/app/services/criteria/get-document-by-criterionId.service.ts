import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getBaseUrl } from '../config';
@Injectable({
  providedIn: 'root',
})
export class GetDocumentByCriterionIdService {
  private apiUrl = getBaseUrl();

  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');

  getDocumentByCriterionId(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      Authorization: `Bearer ${this.token}` 
    });

    return this.http.get(`${this.apiUrl}/criteria/export-docx/${id}`, {
      headers: headers,
      responseType: 'blob',
    });
  }
}
