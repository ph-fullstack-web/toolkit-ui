import { TestBed } from '@angular/core/testing';
import { JwtService } from './jwt.service';


describe('JwtService', () => {

  let service: JwtService;

  beforeEach(() => {
  
      const apiServiceSpyObj = jasmine.createSpyObj('ApiService', ['get', 'post', 'delete']);
      TestBed.configureTestingModule({providers: [
        JwtService, 
      ]});

  });

  it ('getToken should return mocked token', () => {
      service = TestBed.inject(JwtService);
      window.localStorage.setItem('jwtToken', 'myToken');
      expect(service.getToken()).toEqual('myToken');
  }); 

  it ('saveToken should save mocked token', () => {
      service = TestBed.inject(JwtService);
      service.saveToken('myToken_1');
      expect(window.localStorage['jwtToken']).toEqual('myToken_1');
  }); 

  it ('destroyToken should remove mocked token', () => {
      service = TestBed.inject(JwtService);
      service.destroyToken();
      let xxx = window.localStorage['jwtToken'];
      console.log({xxx});
      expect(window.localStorage['jwtToken']).toBeUndefined();
  }); 

});
