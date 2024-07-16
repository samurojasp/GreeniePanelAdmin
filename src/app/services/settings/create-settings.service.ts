import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateSettingService {
  private apiUrl =
    'https://greeniemetric-backend.sustentabilidadtech.lat/api/v1';

  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');

  postSetting(body: CreateSettingBody): Observable<any> {
    console.log(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    console.log(body);
    return this.http.post(`${this.apiUrl}/settings`, body, {
      headers,
    });
  }
}

export interface ContributionSetting {}

export interface CreateSettingBody {
  key: string;
  contributionSettings: {
    initDate: Date;
    endDate: Date;
    getNotificationForContribution: boolean;
    recordatory: boolean;
  };
}
