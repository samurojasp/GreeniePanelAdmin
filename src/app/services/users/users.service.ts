import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AddUserBody, EditUserBody, CreateUserBody } from './types';
import { getBaseUrl } from '../config';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = getBaseUrl();

  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');

  postUsers(body: AddUserBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` });
    return this.http.post(`${this.apiUrl}/users`, body, {
      headers,
    });
  }

  getUserById(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` });
    return this.http.get(`${this.apiUrl}/users/${id}`, {
      headers,
    });
  }

  getPaginatedUser(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` });
    return this.http.get(`${this.apiUrl}/users`, {
      headers,
    });
  }

  editUser(id: number, body: EditUserBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` });
    return this.http.patch(`${this.apiUrl}/users/${id}`,body, {
      headers,
    });
  }

  deleteUser(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` });
    return this.http.delete(`${this.apiUrl}/users/${id}`, {
      headers,
    });
  }

  createUser(body: CreateUserBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` });
    return this.http.post(`${this.apiUrl}/users`,body, {
      headers,
    });
  }

  getAllDepartments(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` });
    return this.http.get(`${this.apiUrl}/dptos`, {
      headers,
    });
  }
}
