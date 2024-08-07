import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RestUserService } from './rest-user.service';
import {
  UserCreateRequest,
  UserCreateResponse,
  PaginatedUserResponse,
  User,
} from '../../domain/models/user.model';

describe('RestUserService', () => {
  let service: RestUserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestUserService],
    });

    service = TestBed.inject(RestUserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should return paginated users', () => {
      const mockResponse: PaginatedUserResponse = {
        page: 1,
        per_page: 6,
        total: 12,
        total_pages: 2,
        data: [
          {
            id: 1,
            email: 'test1@example.com',
            first_name: 'Test',
            last_name: 'One',
            avatar: 'avatar1.png',
          },
          // Add more users as needed
        ],
      };

      service.getUsers().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://reqres.in/api/users?page=1');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getUserById', () => {
    it('should return a single user', () => {
      const userId = 1;
      const mockResponse = {
        data: {
          id: userId,
          email: 'test1@example.com',
          first_name: 'Test',
          last_name: 'One',
          avatar: 'avatar1.png',
        },
      };

      service.getUserById(userId).subscribe((response) => {
        expect(response).toEqual(mockResponse.data);
      });

      const req = httpMock.expectOne(`https://reqres.in/api/users/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('createUser', () => {
    it('should create a user', () => {
      const newUser: UserCreateRequest = {
        name: 'Test User',
        job: 'Developer',
      };
      const mockResponse: UserCreateResponse = {
        id: 101,
        name: 'Test User',
        job: 'Developer',
        createdAt: '2021-01-01T00:00:00.000Z',
      };

      service.createUser(newUser).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://reqres.in/api/users');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', () => {
      const userId = 1;

      service.deleteUser(userId).subscribe((response) => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne(`https://reqres.in/api/users/${userId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('updateUser', () => {
    it('should update a user', () => {
      const userId = 1;
      const updatedUser: UserCreateRequest = {
        name: 'Updated User',
        job: 'Senior Developer',
      };
      const mockResponse: UserCreateResponse = {
        id: 101,
        name: 'Updated User',
        job: 'Senior Developer',
        updatedAt: '2021-01-01T00:00:00.000Z',
      };

      service.updateUser(userId, updatedUser).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`https://reqres.in/api/users/${userId}`);
      expect(req.request.method).toBe('PATCH');
      req.flush(mockResponse);
    });
  });
});
