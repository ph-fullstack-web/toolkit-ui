import { provideComponentStore } from '@ngrx/component-store';
import { TestBed } from '@angular/core/testing';

import { ListStore } from '@app/store/local';

describe('ListStore', () => {
  let store: ListStore<{ id: string }>;
  const id = 'test_id';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideComponentStore(ListStore)],
    });

    store = TestBed.inject(ListStore);
    store.initializeState();
  });

  it('should initialize the state', () => {
    spyOn(store, 'setState');
    store.initializeState();
    expect(store.setState).toHaveBeenCalledWith({ currentPage: 1, itemsPerPage: 5, listItems: [], searchKey: '' });
  });

  it('should get the store name', () => {
    expect(store.name).toBe('list');
  });

  describe('GIVEN that item is fetched from the list', () => {
    beforeEach(() => store.patchState({ listItems: [{ id }] }));
    it('should return the item based from id', (done: DoneFn) => {
      store.getItem(id).subscribe(item => {
        expect(item).toBeTruthy();
        done();
      });
    });
    it('should return the item based from projector', (done: DoneFn) => {
      store
        .getItem(state => state.currentPage)
        .subscribe(page => {
          expect(page).toBe(1);
          done();
        });
    });
  });

  it('should fetch the list by search', (done: DoneFn) => {
    store.patchState({ searchKey: id.toString(), listItems: [{ id }] });
    store.listItemsBySearch$.subscribe(list => {
      expect(list).toContain({ id });
      done();
    });
  });

  it('should fetch the list by index range', (done: DoneFn) => {
    store.patchState({ listItems: [{ id }] });
    store.listItems$.subscribe(list => {
      expect(list.length).toBeTruthy();
      done();
    });
  });

  it('should get page count', (done: DoneFn) => {
    store.patchState({ listItems: [{ id }] });
    store.pageCount$.subscribe(count => {
      expect(count).toBe(1);
      done();
    });
  });

  it('should get current page', (done: DoneFn) => {
    store.patchState({ listItems: [{ id }] });
    store.currentPage$.subscribe(page => {
      expect(page).toBe(1);
      done();
    });
  });

  it('should check if next is disabled', (done: DoneFn) => {
    store.patchState({ listItems: [{ id }] });
    store.isNextDisabled$.subscribe(disabled => {
      expect(disabled).toBeTrue();
      done();
    });
  });

  it('should check if previous is disabled', (done: DoneFn) => {
    store.patchState({ listItems: [{ id }] });
    store.isPreviousDisabled$.subscribe(disabled => {
      expect(disabled).toBeTrue();
      done();
    });
  });

  it('should get search key', (done: DoneFn) => {
    const searchKey = 'search_key';
    store.patchState({ listItems: [{ id }], searchKey });
    store.searchKey$.subscribe(searchKey => {
      expect(searchKey).toBe(searchKey);
      done();
    });
  });

  it('should get page options', (done: DoneFn) => {
    store.pageOptions$.subscribe(options => {
      expect(options).toBeTruthy();
      done();
    });
  });

  it('should get pagination metadata', (done: DoneFn) => {
    store.patchState({ listItems: [{ id }] });
    store.paginationMetadata$.subscribe(metadata => {
      expect(metadata[0]).toEqual(jasmine.objectContaining({ isActive: true }));
      done();
    });
  });

  it('should set current page', (done: DoneFn) => {
    store.setCurrentPage(2);
    store.currentPage$.subscribe(page => {
      expect(page).toBe(2);
      done();
    });
  });

  it('should set items per page', (done: DoneFn) => {
    store.setItemsPerPage(7);
    store
      .select(state => state.itemsPerPage)
      .subscribe(itemsPerPage => {
        expect(itemsPerPage).toBe(7);
        done();
      });
  });

  it('should go to next page', (done: DoneFn) => {
    store.goToNextPage();
    store.currentPage$.subscribe(page => {
      expect(page).toBe(2);
      done();
    });
  });

  it('should go to previous page', (done: DoneFn) => {
    store.patchState({ currentPage: 2 });
    store.goToPreviousPage();
    store.currentPage$.subscribe(page => {
      expect(page).toBe(1);
      done();
    });
  });

  it('should add item', (done: DoneFn) => {
    store.patchState({ listItems: [{ id }] });
    store.addItem({ id: 'test_id_2' });
    store.listItems$.subscribe(list => {
      expect(list.length).toBe(2);
      done();
    });
  });

  it('should update item', (done: DoneFn) => {
    store.patchState({ listItems: [{ id }] });
    store.updateItem(id, { id: 'updated_id' });
    store.listItems$.subscribe(list => {
      expect(list).toContain({ id: 'updated_id' });
      done();
    });
  });

  it('should delete item', (done: DoneFn) => {
    store.patchState({ listItems: [{ id }] });
    store.deleteItem(id);
    store.listItems$.subscribe(list => {
      expect(list.length).toBeFalsy();
      done();
    });
  });
});
