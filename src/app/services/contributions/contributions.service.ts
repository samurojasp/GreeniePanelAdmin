import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContributionBody } from './types';

@Injectable({
  providedIn: 'root',
})
export class ContributionsService {
  apiUrl: any;
  constructor(private http: HttpClient) {}
  token = localStorage.getItem('token');

  transformBodyToFormData(body: ContributionBody): FormData {
    const postContributionFormData = new FormData();
    postContributionFormData.append('description', body.description);
    postContributionFormData.append('categoryId', body.categoryId.toString());
    postContributionFormData.append('indicatorID', body.indicatorID.toString());
    postContributionFormData.append('link', JSON.stringify(body.links));

    for (let i = 0; i < body.file.length; i++) {
      postContributionFormData.append(
        'file',
        JSON.stringify({
          name: body.file[i].name,
          description: body.file[i].description,
        })
      );
      postContributionFormData.append('files', body.file[i].file!);
    }

    postContributionFormData.append('description', body.description);
    return postContributionFormData;
  }

  putContribution(body: ContributionBody): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.put(`${this.apiUrl}contributions`, body, {
      headers,
    });
  }

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
