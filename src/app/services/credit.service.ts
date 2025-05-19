import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Credit} from '../model/credit.model';

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private apiUrl = 'http://localhost:8085/api/credits';

  constructor(private http: HttpClient) {}

  getCredits(): Observable<Credit[]> {
    return this.http.get<Credit[]>(this.apiUrl);
  }

  getCredit(id: number): Observable<Credit> {
    return this.http.get<Credit>(`${this.apiUrl}/${id}`);
  }

  addCredit(credit: Credit): Observable<Credit> {
    return this.http.post<Credit>(this.apiUrl, credit);
  }

  updateCredit(credit: Credit): Observable<Credit> {
    return this.http.put<Credit>(`${this.apiUrl}/${credit.id}`, credit);
  }

  deleteCredit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
