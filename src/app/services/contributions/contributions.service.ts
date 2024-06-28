import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContributionsService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  getPaginatedContributions(
    page: number,
    take: number,
    categoryFilter: number
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let URL = `${this.apiUrl}/contributions?page=${page}&take=${take}`;
    if (categoryFilter !== 0 && categoryFilter) {
      URL = URL.concat(`&categoryId=${categoryFilter}`);
    }
    return this.http.get(URL, {
      headers,
    });
  }

  deleteContribution(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.apiUrl}/contributions/${id}`, {
      headers,
    });
  }
}
