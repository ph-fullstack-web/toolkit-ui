import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import {
  ConsultantLocalModel,
  ConsultantStore,
  ListStore,
  LocalStoreFactory,
  PageOptions,
  provideLocalStoreFactory,
} from '@app/store/local';

import {
  LocalStoreExampleTemplateComponent,
  PropertyChangeArgs,
} from '../local-store-example-template/local-store-example-template.component';

@Component({
  templateUrl: './local-store-example-page.component.html',
  imports: [LocalStoreExampleTemplateComponent, AsyncPipe],
  providers: [provideLocalStoreFactory()],
  standalone: true,
})
export class LocalStoreExamplePageComponent implements OnInit {
  constructor(private readonly storeFactory: LocalStoreFactory) {}

  private consultantStore!: ConsultantStore;
  private consultantListStore!: ListStore<ConsultantLocalModel>;

  consultants$!: Observable<ConsultantLocalModel[]>;
  pageOptions$!: Observable<PageOptions>;
  isLoading$!: Observable<boolean>;

  ngOnInit(): void {
    this.consultantStore = this.storeFactory.createInstance('consultant');

    this.consultantListStore = this.consultantStore.listStore;
    this.consultantListStore.setItemsPerPage(5);

    this.consultants$ = this.consultantStore.consultants$;
    this.isLoading$ = this.consultantStore.isLoading$;
    this.pageOptions$ = this.consultantListStore.pageOptions$;
  }

  onConsultantAdd(model: ConsultantLocalModel) {
    this.consultantStore.addConsultant(model);
  }

  onConsultantUpdate(args: PropertyChangeArgs) {
    this.consultantStore.updateConsultant(args.id, args.value);
  }

  onConsultantDelete(id: string) {
    this.consultantStore.deleteConsultant(id);
  }

  onPageSelect(pageNum: number) {
    this.consultantListStore.setCurrentPage(pageNum);
  }

  onSearchChange(searchKey: string) {
    this.consultantListStore.setSearchKey(searchKey);
  }

  onPageNavigate(direction: 'previous' | 'next') {
    if (direction === 'previous') {
      return this.consultantListStore.goToPreviousPage();
    }

    return this.consultantListStore.goToNextPage();
  }
}
