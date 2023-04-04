import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FeedbackId, FeedbackLocalModel } from '@app/store/local';

export type PageOptions = {
  pageCount: number;
  currentPage: number;
  searchKey: string;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
};

@Component({
  selector: 'app-feedback-template',
  templateUrl: './feedback-template.component.html',
  styleUrls: ['././feedback-template.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
})
export class FeedbackTemplateComponent implements OnInit {
  @Input() feedbacks!: FeedbackLocalModel[];
  @Input() isLoading!: boolean;
  @Input() _pageOptions!: {
    pageCount: number;
    currentPage: number;
    isPreviousDisabled: boolean;
    isNextDisabled: boolean;
  };
  @Input() set pageOptions(options: PageOptions) {
    this.pageNumbers = [];

    for (let i = 1; i <= options.pageCount; i++) {
      this.pageNumbers.push({ isActive: i === options.currentPage, value: i });
    }

    this.searchKey = options.searchKey;
    this.isPreviousDisabled = options.isPreviousDisabled;
    this.isNextDisabled = options.isNextDisabled;
  }
  @Output() feedbackAdd = new EventEmitter<FeedbackLocalModel>();
  @Output() pageSelect = new EventEmitter<number>();
  @Output() feedbacktDelete = new EventEmitter<FeedbackId>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() pageNavigate = new EventEmitter<'previous' | 'next'>();

  columnNames!: string[];
  searchKey!: string;
  pageNumbers!: { isActive: boolean; value: number }[];
  isNextDisabled!: boolean;
  isPreviousDisabled!: boolean;

  ngOnInit(): void {
    this.columnNames = Object.keys(this.feedbacks?.[0] ?? {});
  }

  onAddFeedback() {
    this.feedbackAdd.emit(this.generateFeedback());
  }

  onPageClick(pageNum: number) {
    this.pageSelect.emit(pageNum);
  }

  onDeleteItem(id: FeedbackId) {
    this.feedbacktDelete.emit(id);
  }

  onSearchClick(searchKey: string) {
    this.searchChange.emit(searchKey);
  }

  onNavigate(direction: 'previous' | 'next') {
    this.pageNavigate.next(direction);
  }

  onSearchKeyPress(event: KeyboardEvent) {
    if (event.key.toUpperCase() === 'ENTER') {
      const input = event.target as HTMLInputElement;
      this.searchChange.emit(input.value);
    }
  }

  private generateFeedback(): FeedbackLocalModel {
    const id = (Math.random() + 1).toString(36).substring(10);
    const firstName = (Math.random() + 1).toString(36).substring(7);
    const lastName = (Math.random() + 1).toString(36).substring(7);
    const feedbackEmail = `${firstName}_${lastName}@domain.com`;

    return {
      id,
      feedbackEmail,
      firstName,
      lastName,
    };
  }
}
