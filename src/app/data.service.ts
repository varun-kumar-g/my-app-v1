import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from './common/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  private httpUrl = 'https://localhost:44355/api/UsersManagement'

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getUsers(): Observable<User[]> 
  { 
    return this.http.get<User[]>(this.httpUrl)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getUser(id: number): Observable<User | undefined> {
    return this.getUsers()
      .pipe(
        map((users: User[]) => users.find(p => p.id === id))
      );
  }
 

  addUser(user:User): Observable<User> {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(user);
   
      return this.http.post<User>(this.httpUrl, body,{'headers':headers})
         .pipe(
           catchError((err) => {
             console.error(err);
             throw err;
           }
         ));
    }

    deleteUser(id: number): Observable<ArrayBuffer> {
        const headers = { 'content-type': 'application/json'}  
        const body = JSON.stringify(id);
     
        return this.http.delete<ArrayBuffer>(this.httpUrl + "/" + id)
           .pipe(
             catchError((err) => {
               console.error(err);
               throw err;
             }
           ));
      }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}
