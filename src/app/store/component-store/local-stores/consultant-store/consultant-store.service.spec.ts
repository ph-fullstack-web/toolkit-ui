import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { provideComponentStore } from '@ngrx/component-store';

import { ConsultantLocalModel, ConsultantStore, LIST_STORE_TOKEN } from '@app/store/local';

describe('ConsultantStore', () => {
  const consultantId = 'consultant_id';
  const consultant: ConsultantLocalModel = {
    id: consultantId,
    consultantEmail: 'paulj@magenic.com',
    firstName: 'Paul',
    lastName: 'Jimenez',
  };

  const listStoreMock = {
    get listItems$() {
      return Observable;
    },
    getItem: jasmine.createSpy(),
    deleteItem: jasmine.createSpy(),
    updatePartial: jasmine.createSpy(),
    updateItem: jasmine.createSpy(),
    addItem: jasmine.createSpy(),
  };

  let service: ConsultantStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideComponentStore(ConsultantStore),
        {
          provide: LIST_STORE_TOKEN,
          useValue: listStoreMock,
        },
      ],
    });

    service = TestBed.inject(ConsultantStore);
  });

  it('should initialize the state', () => {
    spyOn(service, 'setState');
    service.initializeState();
    expect(service.setState).toHaveBeenCalledWith({ isLoading: false });
  });

  it('should set correct store name', () => {
    expect(service.name).toBe('consultant');
  });

  it('should get consultant', (done: DoneFn) => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    testScheduler.run(({ cold, expectObservable }) => {
      listStoreMock.getItem.withArgs(consultantId).and.returnValue(cold('a', { a: consultant }));
      expectObservable(service.getConsultant(consultantId)).toBe('a', { a: consultant });
      done();
    });
  });

  it('should get loading state', (done: DoneFn) => {
    service.setState({ isLoading: true });
    service.isLoading$.subscribe(isLoading => {
      expect(isLoading).toBeTrue();
      done();
    });
  });

  it('should delete consultant successfully', fakeAsync(() => {
    listStoreMock.getItem.withArgs(consultantId).and.returnValue(of(consultant));
    spyOn(service, 'updatePartial');

    service.initializeState();
    service.deleteConsultant(consultantId);
    tick(1000);

    expect(listStoreMock.deleteItem).toHaveBeenCalledWith(consultantId);
    expect(listStoreMock.updatePartial).toHaveBeenCalledWith({ searchKey: '', currentPage: 1 });
    expect(service.updatePartial).toHaveBeenCalledWith({ isLoading: false });
  }));

  it('should update consultant', () => {
    service.updateConsultant(consultantId, { firstName: 'John' });
    expect(listStoreMock.updateItem).toHaveBeenCalledWith(consultantId, { firstName: 'John' });
  });

  it('should add consultant', fakeAsync(() => {
    spyOn(service, 'updatePartial');

    service.initializeState();
    service.addConsultant(consultant);
    tick(1000);

    expect(listStoreMock.addItem).toHaveBeenCalledWith(consultant);
    expect(listStoreMock.updatePartial).toHaveBeenCalledWith({ searchKey: '', currentPage: 1 });
    expect(service.updatePartial).toHaveBeenCalledWith({ isLoading: false });
  }));
});
