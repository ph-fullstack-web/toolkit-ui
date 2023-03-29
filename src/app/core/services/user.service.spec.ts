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
    });

    it('getCurrentUser should return non null value', () => {
        service = TestBed.inject(UserService);
        expect(service.getCurrentUser()).not.toBeNull();
    }) 

});

