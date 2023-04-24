import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { provideComponentStore } from '@ngrx/component-store';

import { ConsultantLocalModel, ConsultantStore, IListStore, LIST_STORE_TOKEN } from '@app/store/local';

describe('ConsultantStore', () => {
  const consultantId = 'consultant_id';
  const consultant: ConsultantLocalModel = {
    id: consultantId,
    consultantEmail: 'paulj@magenic.com',
    firstName: 'Paul',
    lastName: 'Jimenez',
  };

  const listStoreSpy = jasmine.createSpyObj<IListStore<ConsultantLocalModel>>('list store', [
    'getItem',
    'deleteItem',
    'updatePartial',
    'updateItem',
    'addItem',
  ]);

  let store: ConsultantStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideComponentStore(ConsultantStore),
        {
          provide: LIST_STORE_TOKEN,
          useValue: listStoreSpy,
        },
      ],
    });

    store = TestBed.inject(ConsultantStore);
  });

  it('should initialize the state', () => {
    spyOn(store, 'setState');
    store.initializeState();
    expect(store.setState).toHaveBeenCalledWith({ isLoading: false });
  });

  it('should get the store name', () => {
    expect(store.name).toBe('consultant');
  });

  it('should get consultant', (done: DoneFn) => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    testScheduler.run(({ cold, expectObservable }) => {
      listStoreSpy.getItem.withArgs(consultantId).and.returnValue(cold('a', { a: consultant }));
      expectObservable(store.getConsultant(consultantId)).toBe('a', { a: consultant });
      done();
    });
  });

  it('should get loading state', (done: DoneFn) => {
    store.setState({ isLoading: true });
    store.isLoading$.subscribe(isLoading => {
      expect(isLoading).toBeTrue();
      done();
    });
  });

  it('should delete consultant successfully', fakeAsync(() => {
    listStoreSpy.getItem.withArgs(consultantId).and.returnValue(of(consultant));
    spyOn(store, 'updatePartial');

    store.initializeState();
    store.deleteConsultant(consultantId);
    tick(1000);

    expect(listStoreSpy.deleteItem).toHaveBeenCalledWith(consultantId);
    expect(listStoreSpy.updatePartial).toHaveBeenCalledWith({ searchKey: '', currentPage: 1 });
    expect(store.updatePartial).toHaveBeenCalledWith({ isLoading: false });
  }));

  it('should update consultant', () => {
    store.updateConsultant(consultantId, { firstName: 'John' });
    expect(listStoreSpy.updateItem).toHaveBeenCalledWith(consultantId, { firstName: 'John' });
  });

  it('should add consultant', fakeAsync(() => {
    spyOn(store, 'updatePartial');

    store.initializeState();
    store.addConsultant(consultant);
    tick(1000);

    expect(listStoreSpy.addItem).toHaveBeenCalledWith(consultant);
    expect(listStoreSpy.updatePartial).toHaveBeenCalledWith({ searchKey: '', currentPage: 1 });
    expect(store.updatePartial).toHaveBeenCalledWith({ isLoading: false });
  }));
});
