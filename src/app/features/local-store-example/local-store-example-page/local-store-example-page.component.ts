import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, combineLatest, map } from 'rxjs';

import {
  ConsultantId,
  ConsultantLocalModel,
  ConsultantStore,
  LocalStoreFactory,
  provideLocalStoreFactory,
} from '@app/store/local';

import {
  LocalStoreExampleTemplateComponent,
  PageOptions,
} from '../local-store-example-template/local-store-example-template.component';

@Component({
  templateUrl: './local-store-example-page.component.html',
  imports: [LocalStoreExampleTemplateComponent, AsyncPipe],
  providers: [provideLocalStoreFactory()],
  standalone: true,
})
export class LocalStoreExamplePageComponent implements OnInit {
  constructor(private readonly storeFactory: LocalStoreFactory) {}

  private store!: ConsultantStore;

  consultants$!: Observable<ConsultantLocalModel[]>;
  pageOptions$!: Observable<PageOptions>;
  isLoading$!: Observable<boolean>;

  ngOnInit(): void {
    this.store = this.storeFactory.createInstance<ConsultantStore>('consultant');
    this.store.setItemsPerPage(5);

    this.consultants$ = this.store.consultants$;
    this.isLoading$ = this.store.isLoading$;

    this.pageOptions$ = combineLatest([
      this.store.pageCount$,
      this.store.searchKey$,
      this.store.currentPage$,
      this.store.isPreviousDisabled$,
      this.store.isNextDisabled$,
    ]).pipe(
      map(([pageCount, searchKey, currentPage, isPreviousDisabled, isNextDisabled]) => ({
        pageCount,
        searchKey,
        currentPage,
        isPreviousDisabled,
        isNextDisabled,
      }))
    );
  }

  onConsultantAdd(model: ConsultantLocalModel) {
    this.store.addConsultant(model);
  }

  onPageSelect(pageNum: number) {
    this.store.setCurrentPage(pageNum);
  }

  onConsultantDelete(id: ConsultantId) {
    this.store.deleteConsultant(id);
  }

  onSearchChange(searchKey: string) {
    this.store.setSearchKey(searchKey);
  }

  onPageNavigate(direction: 'previous' | 'next') {
    if (direction === 'next') {
      return this.store.goToNextPage();
    }

    return this.store.goToPreviousPage();
  }
}
