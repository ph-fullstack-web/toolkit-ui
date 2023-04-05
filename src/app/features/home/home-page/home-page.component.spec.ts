import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RunHelpers, TestScheduler } from 'rxjs/testing';
import { ActivatedRoute } from '@angular/router';
import { MockComponent } from 'ng-mocks';

import { HomeTemplateComponent } from '../home-template/home-template.component';
import { MockActivatedRoute } from '@mocks';

import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let activatedRouteStub: MockActivatedRoute;

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  beforeEach(() => {
    activatedRouteStub = new MockActivatedRoute();
    TestBed.overrideComponent(HomePageComponent, {
      set: {
        imports: [MockComponent(HomeTemplateComponent)],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
      },
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to route data and to check user authenticity', (done: DoneFn) => {
    testScheduler.run((helpers: RunHelpers) => {
      const { cold, expectObservable, flush } = helpers;
      const isAuthenticated = true;

      activatedRouteStub.data = cold('a|', { a: { isAuthenticated } });
      fixture.detectChanges();
      flush();

      expectObservable(component.isAuthenticated$).toBe('a|', {
        a: isAuthenticated,
      });
      done();
    });
  });
});
