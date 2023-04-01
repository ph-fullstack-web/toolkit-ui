import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { HomeTemplateComponent } from "../home-template/home-template.component";
import { HomePageComponent } from "./home-page.component";
import { MockActivatedRoute } from "@mocks";
import { MockComponent } from "ng-mocks";
import { of } from "rxjs";

describe('HomePageComponent', () => {

    let component: HomePageComponent;
    let activatedRouteStub: MockActivatedRoute;
  
    beforeEach(() => {

        activatedRouteStub = new MockActivatedRoute();
        TestBed.overrideComponent(HomePageComponent, {
            set: {
                imports: [MockComponent(HomeTemplateComponent)],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                providers: [
                    { provide: ActivatedRoute, useValue: activatedRouteStub}
                ]
            }
        }).compileComponents();
    });

    it('should create an instance', () => {
        component = TestBed.createComponent(HomePageComponent).componentInstance;
        expect(component).toBeTruthy();
    });

    it('should assign correct isAuthenticated value', () => {
        activatedRouteStub.data = of({isAuthenticated: true});
        component = TestBed.createComponent(HomePageComponent).componentInstance;
        component.ngOnInit();
        expect(component.isAuthenticated).toEqual(true);
    });

})