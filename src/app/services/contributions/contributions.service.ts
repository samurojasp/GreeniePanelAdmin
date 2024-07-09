import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContributionBody } from './types';

@Injectable({
  providedIn: 'root',
})
export class ContributionsService {
  private apiUrl = 'http://localhost:3000/api/v1/';
  constructor(private http: HttpClient) {}
  token = localStorage.getItem('token');

  transformBodyToFormData(body: ContributionBody): FormData {
    const postContributionFormData = new FormData();
    postContributionFormData.append('uuid', body.uuid);
    postContributionFormData.append('description', body.description);
    postContributionFormData.append('categoryId', body.categoryId.toString());
    postContributionFormData.append('indicatorID', body.indicatorID.toString());

    const stringifiedLinks = body.links
      .map((link) => JSON.stringify(link))
      .join(',');

    postContributionFormData.append('link', stringifiedLinks);

    const stringifiedFiles = body.file
      .map((file) => JSON.stringify(file))
      .join(',');

    postContributionFormData.append('file', stringifiedFiles);

    body.files.forEach((file) => {
      postContributionFormData.append('files', file);
    });

    return postContributionFormData;
  }

  postContribution(body: ContributionBody): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const formData = this.transformBodyToFormData(body);
    return this.http.post(`${this.apiUrl}contributions`, formData, {
      headers,
    });
  }

  getPaginatedContributions(
    page: number,
    take: number,
    categoryFilter: number
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let URL = `${this.apiUrl}contributions?page=${page}&take=${take}`;
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
