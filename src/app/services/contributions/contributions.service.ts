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
    console.log(body.description);
    postContributionFormData.append('uuid', body.uuid);
    postContributionFormData.append('description', body.description);
    postContributionFormData.append('categoryId', body.categoryId.toString());
    postContributionFormData.append('indicatorID', body.indicatorID.toString());

    const stringifiedLinks = body.links
      .map((link) => JSON.stringify(link))
      .join(',');

    console.log(stringifiedLinks);
    postContributionFormData.append('link', stringifiedLinks);

    body.file.forEach((file) => {
      const blob = new Blob([file.file!], { type: 'application/pdf' });

      postContributionFormData.append(
        'file',
        JSON.stringify({
          name: file.name,
          description: file.description,
        })
      );
      postContributionFormData.append('files', blob);
    });

    return postContributionFormData;
  }

  postContribution(body: ContributionBody): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const formData = this.transformBodyToFormData(body);
    console.log(formData.get('categoryId'));
    return this.http.post(`${this.apiUrl}contributions`, formData, {
      headers,
    });
  }

  role = localStorage.getItem('role');

  getPaginatedContributions(
    page: number,
    take: number,
    categoryFilter: number,
    departmentFilter: number,
    indicatorFilter: number
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    let URL = `${this.apiUrl}contributions?page=${page}&take=${take}`;
    if (categoryFilter !== 0 && categoryFilter) {
      URL = URL.concat(`&categoryId=${categoryFilter}`);
    }
    if (departmentFilter !== 0 && departmentFilter) {
      URL = URL.concat(`&dptoId=${departmentFilter}`);
    }
    if (indicatorFilter !== 0 && indicatorFilter) {
      URL = URL.concat(`&indicatorId=${indicatorFilter}`);
    }
    return this.http.get(URL, {
      headers,
    });
  }

  getPaginatedMyContributions(
    page: number,
    take: number,
    categoryFilter: number,
    departmentFilter: number,
    indicatorFilter: number
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    let URL = `${this.apiUrl}/contributions?page=${page}&take=${take}`;
    if (this.role === 'dpto') {
      URL = `${this.apiUrl}/contributions/my-contribution?page=${page}&take=${take}`;
    }
    if (categoryFilter !== 0 && categoryFilter) {
      URL = URL.concat(`&categoryId=${categoryFilter}`);
    }
    if (departmentFilter !== 0 && departmentFilter) {
      URL = URL.concat(`&dptoId=${departmentFilter}`);
    }
    if (indicatorFilter !== 0 && indicatorFilter) {
      URL = URL.concat(`&indicatorId=${indicatorFilter}`);
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

  getAllDepartment(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}/dptos`, {
      headers,
    });
  }
}
