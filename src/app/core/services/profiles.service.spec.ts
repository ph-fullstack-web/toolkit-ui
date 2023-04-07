import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Profile } from '@models';
import { of } from 'rxjs';
import { ApiService } from './api.service';
import { ProfilesService } from './profiles.service';

describe('ProfilesService', () => {
  let service: ProfilesService;

  beforeEach(() => {
    const apiServiceSpyObj = jasmine.createSpyObj('ApiService', ['get', 'post', 'delete']);
    TestBed.configureTestingModule({
      providers: [ProfilesService, { provide: ApiService, useValue: apiServiceSpyObj }, HttpClient, HttpHandler],
    });
  });

  it('get should return equal to mocked Profile', done => {
    service = TestBed.inject(ProfilesService);
    const apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    const profileMock: Profile = {
      username: '',
      bio: '',
      image: '',
      following: false,
    };
    const observableMock = of({ profile: profileMock });

    apiServiceSpy.get.and.returnValue(observableMock);

    service.get('sampleusername').subscribe({
      next: profile => {
        expect(profile).toEqual(profileMock);
        done();
      },
    });
  });

  it('follow should return mocked Profile', done => {
    service = TestBed.inject(ProfilesService);
    const apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    const profileMock: Profile = {
      username: '',
      bio: '',
      image: '',
      following: false,
    };
    const observableMock = of(profileMock);

    apiServiceSpy.post.and.returnValue(observableMock);

    service.follow('sampleusername').subscribe({
      next: profile => {
        expect(profile).toEqual(profileMock);
        done();
      },
    });
  });

  it('unfollow should return mocked Profile', done => {
    service = TestBed.inject(ProfilesService);
    const apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    const profileMock: Profile = {
      username: '',
      bio: '',
      image: '',
      following: false,
    };
    const observableMock = of(profileMock);

    apiServiceSpy.delete.and.returnValue(observableMock);

    service.unfollow('sampleusername').subscribe({
      next: profile => {
        expect(profile).toEqual(profileMock);
        done();
      },
    });
  });
});
