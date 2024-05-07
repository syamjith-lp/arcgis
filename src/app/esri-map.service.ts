import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EsriMapService {
  public horizonUrl = environment.apiUrl + 'horizon/';

  constructor(public http: HttpClient) {}

  getEsriAccessToken(): Observable<any> {
    const url = this.horizonUrl + 'generateToken';
    return this.http.get<any>(url);
  }
}
