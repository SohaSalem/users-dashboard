import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { UserService } from "../../domain/outbound/user.service";
import {
  PaginatedUserResponse,
  User,
  UserCreateRequest,
  UserCreateResponse,
} from "../../domain/models/user.model";

@Injectable({
  providedIn: "root",
})
export class RestUserService implements UserService {
  private baseUrl = "https://reqres.in/api/users";

  constructor(private http: HttpClient) {}

  //  An API endpoint for listing users. (Users list view)

  getUsers(page: number = 1): Observable<PaginatedUserResponse> {
    return this.http
      .get<PaginatedUserResponse>(`${this.baseUrl}?page=${page}`)
      .pipe(map((response: PaginatedUserResponse) => response));
  }

  // An API endpoint for getting a single user. (Single user view)

  getUserById(userId: number): Observable<User> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`).pipe(
      map((response) => response.data) // Extract the 'data' field from the response
    );
  }

  // An API endpoint for creating a user. (User creation view)
  createUser(user: UserCreateRequest): Observable<any> {
    return this.http.post<UserCreateResponse>(this.baseUrl, user);
  }
}
