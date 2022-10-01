import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(
    private _http: HttpClient
  ) {
  }

  get(): Observable<any> {
    return this._http.get(environment.apiUrl);
  }

  createUser(user: User): Observable<any> {
    return this._http.post<User>(`${environment.apiUrl}/createUser`, {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });
  }

  getUsers(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/person`);
  }

}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
}
