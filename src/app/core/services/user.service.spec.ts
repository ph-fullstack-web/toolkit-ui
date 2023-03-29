import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed} from '@angular/core/testing';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    beforeEach(() => {
        TestBed.configureTestingModule({providers: [
            UserService, 
            ApiService, 
            JwtService, 
            HttpClient,
            HttpHandler
        ]});
        service = TestBed.inject(UserService);
    });

    it('getCurrentUser should return non null value', () => {
        expect(service.getCurrentUser()).not.toBeNull();
    }) 

});

