import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatchContributionBody, PostContributionBody } from './types';
import { getBaseUrl } from '../config';

@Injectable({
  providedIn: 'root',
})
export class ContributionsService {
  private apiUrl = getBaseUrl();

  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');

  transformPostBodyToFormData(body: PostContributionBody): FormData {
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

  transformPatchBodyToFormData(body: PatchContributionBody): FormData {
    const patchContributionFormData = new FormData();

    patchContributionFormData.append('description', body.description);
    patchContributionFormData.append('categoryId', body.categoryId.toString());
    patchContributionFormData.append(
      'indicatorID',
      body.indicatorID.toString()
    );

    const stringifiedLinks = body.links
      .map((link) => JSON.stringify(link))
      .join(',');

    patchContributionFormData.append('link', stringifiedLinks);

    const stringifiedFiles = body.file
      .map((file) => JSON.stringify(file))
      .join(',');

    patchContributionFormData.append('file', stringifiedFiles);

    body.files.forEach((file) => {
      patchContributionFormData.append('files', file);
    });

    return patchContributionFormData;
  }

  postContribution(body: PostContributionBody): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const formData = this.transformPostBodyToFormData(body);
    return this.http.post(`${this.apiUrl}contributions`, formData, {
      headers,
    });
  }

  patchContribution(
    body: PatchContributionBody,
    uuid: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const formData = this.transformPatchBodyToFormData(body);
    return this.http.patch(`${this.apiUrl}contributions/${uuid}`, formData, {
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
    if (this.role === 'dpto') {
      URL = `${this.apiUrl}contributions/my-contribution?page=${page}&take=${take}`;
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.delete(`${this.apiUrl}contributions/${id}`, {
      headers,
    });
  }

  getAllDepartment(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiUrl}dptos`, {
      headers,
    });
  }

  getContributionById(contributionId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiUrl}contributions/${contributionId}`, {
      headers,
    });
  }
}
