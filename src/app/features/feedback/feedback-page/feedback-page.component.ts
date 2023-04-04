import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, combineLatest, map } from 'rxjs';

import {
  FeedbackId,
  FeedbackLocalModel,
  FeedbackStore,
  LocalStoreFactory,
  provideLocalStoreFactory,
} from '@app/store/local';

import { FeedbackTemplateComponent, PageOptions } from '../feedback-template/feedback-template.component';

@Component({
  templateUrl: './feedback-page.component.html',
  imports: [FeedbackTemplateComponent, AsyncPipe],
  providers: [provideLocalStoreFactory()],
  standalone: true,
})
export class FeedbackPageComponent implements OnInit {
  constructor(private readonly storeFactory: LocalStoreFactory) {}

  private store!: FeedbackStore;

  feedbacks$!: Observable<FeedbackLocalModel[]>;
  pageOptions$!: Observable<PageOptions>;
  isLoading$!: Observable<boolean>;

  ngOnInit(): void {
    this.store = this.storeFactory.createInstance<FeedbackStore>('feedback');
    this.feedbacks$ = this.store.feedbacks$;
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

  onFeedbackAdd(model: FeedbackLocalModel) {
    this.store.addFeedback(model);
  }

  onPageSelect(pageNum: number) {
    this.store.setCurrentPage(pageNum);
  }

  onFeedbackDelete(id: FeedbackId) {
    this.store.deleteFeedback(id);
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
