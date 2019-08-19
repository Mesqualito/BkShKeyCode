import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';
import {StrappingHead} from "../_interface/strapping-head";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverUrl = 'http://localhost:3000';

  constructor(
    private _http: HttpClient
  ) {  }

  // GET - Daten abfragen
  public getStrappingHead(): Observable<StrappingHead[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get<StrappingHead[]>(`${this.serverUrl}/strappingheads`, httpOptions );
  }

  // POST - Daten anlegen
  public postStrappingHead(object: StrappingHead): Observable<StrappingHead> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post<StrappingHead>(`${this.serverUrl}/strappingheads`, object, httpOptions);
  }

  // DELETE - Daten löschen
  public deleteStrappingHead(object: StrappingHead): Observable<StrappingHead> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.delete<StrappingHead>(`${this.serverUrl}/strappingheads/${object.id}`, httpOptions);
  }

  // PUT - Daten verändern
  public putStrappingHead(object: StrappingHead): Observable<StrappingHead> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put<StrappingHead>(`${this.serverUrl}/strappingheads/${object.id}`, object, httpOptions);
  }

}
