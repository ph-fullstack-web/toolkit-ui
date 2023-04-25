import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalStoreExamplePageComponent } from './local-store-example-page.component';
import { LocalStoreExampleTemplateComponent } from '../local-store-example-template/local-store-example-template.component';
import { AsyncPipe } from '@angular/common';
import { ConsultantLocalModel, IConsultantStore, IListStore, LocalStoreFactory, PageOptions } from '@app/store/local';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('LocalStoreExamplePageComponent', () => {
  let pageComponent!: LocalStoreExamplePageComponent;
  let templateComponent!: LocalStoreExampleTemplateComponent;
  let fixture!: ComponentFixture<LocalStoreExamplePageComponent>;

  const consultant: ConsultantLocalModel = {
    consultantEmail: 'PaulJ@magenic.com',
    firstName: 'Paul',
    lastName: 'Jimenez',
    id: '933707',
  };
  const storeFactoryStub = jasmine.createSpyObj<LocalStoreFactory>('store factory', ['createInstance']);
  const listStoreStub = jasmine.createSpyObj<IListStore<ConsultantLocalModel>>(
    'list store',
    ['setItemsPerPage', 'setCurrentPage', 'setSearchKey', 'goToPreviousPage', 'goToNextPage'],
    {
      pageOptions$: of({} as PageOptions),
    }
  );
  const localStoreStub = jasmine.createSpyObj<IConsultantStore>(
    'consultant store',
    ['addConsultant', 'updateConsultant', 'deleteConsultant'],
    {
      listStore: listStoreStub,
    }
  );

  beforeEach(async () => {
    await TestBed.overrideComponent(LocalStoreExamplePageComponent, {
      set: {
        imports: [LocalStoreExampleTemplateComponent, AsyncPipe],
        providers: [
          {
            provide: LocalStoreFactory,
            useValue: storeFactoryStub,
          },
        ],
      },
    }).compileComponents();

    fixture = TestBed.createComponent(LocalStoreExamplePageComponent);
    pageComponent = fixture.componentInstance;
  });

  beforeEach(() => {
    storeFactoryStub.createInstance.and.returnValue(localStoreStub);
    fixture.detectChanges();
    templateComponent = fixture.debugElement.query(By.directive(LocalStoreExampleTemplateComponent))
      .componentInstance as LocalStoreExampleTemplateComponent;
  });

  it('should be rendered', () => expect(pageComponent).toBeTruthy());

  it('should listen to consultantAdd event', () => {
    templateComponent.consultantAdd.emit(consultant);
    expect(localStoreStub.addConsultant).toHaveBeenCalledWith(consultant);
  });

  it('should listen to consultantUpdate event', () => {
    templateComponent.consultantUpdate.emit({ id: consultant.id, value: consultant });
    expect(localStoreStub.updateConsultant).toHaveBeenCalledWith(consultant.id, consultant);
  });

  it('should listen to consultantDelete event', () => {
    templateComponent.consultantDelete.emit(consultant.id);
    expect(localStoreStub.deleteConsultant).toHaveBeenCalledWith(consultant.id);
  });

  it('should listen to page pageSelect event', () => {
    templateComponent.pageSelect.emit(2);
    expect(listStoreStub.setCurrentPage).toHaveBeenCalledWith(2);
  });

  it('should listen to searchChange event', () => {
    templateComponent.searchChange.emit('search_key');
    expect(listStoreStub.setSearchKey).toHaveBeenCalledWith('search_key');
  });

  describe('GIVEN that page is navigated', () => {
    it('it should listen to pageNavigate event with previous as param', () => {
      templateComponent.pageNavigate.emit('previous');
      expect(listStoreStub.goToPreviousPage).toHaveBeenCalled();
    });
    it('it should listen to pageNavigate event with next as param', () => {
      templateComponent.pageNavigate.emit('next');
      expect(listStoreStub.goToNextPage).toHaveBeenCalled();
    });
  });
});
