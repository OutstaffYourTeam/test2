import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { PaginationInterface } from '../../interfaces/base';
import { environment } from '../../../environments/environment';
import { PageSizeDefault, Paginator } from '../../interfaces/paginator';
import { ObjectInterface } from '../..//interfaces/object';
import { SuccessMsgResponse } from '../..//interfaces/success-response';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(private http: HttpClient) { }

  getObjects(pagination:PaginationInterface = null ): Observable<Paginator<ObjectInterface>>{
    const url = `${environment.api}/model`;

    let params = new HttpParams();
    params = params.append('skip', String(pagination?.skip || 0));
    params = params.append('take', String(pagination?.take || PageSizeDefault));

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params,
    };

    return this.http.get<Paginator<ObjectInterface>>(url, httpOptions);
  }

  getObjectById(id: number): Observable<ObjectInterface>{
    const url = `${environment.api}/model/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.get<ObjectInterface>(url, httpOptions);
  }

  deleteObjectById(id: number): Observable<SuccessMsgResponse> {
    const url = `${environment.api}/model/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.delete<SuccessMsgResponse>(url, httpOptions);
  }

  updateObject(id: number, data: ObjectInterface): Observable<ObjectInterface> {
    const url = `${environment.api}/model/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.put<ObjectInterface>(url, data, httpOptions);
  }
}
