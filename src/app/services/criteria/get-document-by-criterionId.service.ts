import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDocumentByCriterionIdService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  getDocumentByCriterionId(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    return this.http.get(`${this.apiUrl}/criteria/export-docx/${id}`, {
      headers: headers,
      responseType: 'blob',
    });
  }
}
