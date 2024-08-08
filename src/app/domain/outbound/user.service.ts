import { Observable } from "rxjs";
import { InjectionToken } from "@angular/core";
import {
  PaginatedUserResponse,
  User,
  UserCreateRequest,
  UserCreateResponse,
} from "../models/user.model";
export const USER_SERVICE = new InjectionToken<string>("USER_SERVICE");

export interface UserService {
  getUsers(page?: number): Observable<PaginatedUserResponse>;
  getUserById(userId: number): Observable<User>;
  createUser(user: UserCreateRequest): Observable<UserCreateResponse>;
}
