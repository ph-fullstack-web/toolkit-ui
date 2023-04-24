import { TestBed } from '@angular/core/testing';
import { LocalStoreFactory } from '@app/store/local';

describe('LocalStoreFactory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStoreFactory],
    });
  });

  it('should create local store instance', () => {
    const factory = TestBed.inject(LocalStoreFactory);
    const store = factory.createInstance('consultant', { sharedStores: ['list'] });

    expect(store).toBeTruthy();
  });
});
