import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ManagerService } from './manager.service';
import { mockManagers } from '@mocks';

describe('ManagerService', () => {
  let service: ManagerService;

  beforeEach(() => {
    const httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [ManagerService, { provide: HttpClient, useValue: httpClientSpyObj }, HttpHandler],
    });
  });

  it('getManagers should return mocked Managers', () => {
    service = TestBed.inject(ManagerService);
    TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

    service.getManagers().subscribe(managers => {
      {
        expect(managers).toEqual({ managers: mockManagers });
      }
    });
  });
});
