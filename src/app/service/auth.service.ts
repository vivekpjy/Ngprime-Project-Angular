import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import  {User} from '../interfaces/auth'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  registerUser(userDetails:User){
    return this.http.post(`${this.baseUrl}/user`,userDetails);
  }
  getUserByEmail(email:string):Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/user?email=${email}`)
  }
}
