export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  job?: string;
}
export interface PaginatedUserResponse {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface UserCreateRequest {
  name: string;
  job: string;
}

export interface UserCreateResponse {
  id: number;
  name: string;
  job: string;
  createdAt?: string;
  updatedAt?: string;
}
