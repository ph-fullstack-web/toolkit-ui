import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ConsultantId, ConsultantLocalModel } from '@app/store/local';

export type PageOptions = {
  pageCount: number;
  currentPage: number;
  searchKey: string;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
};

@Component({
  selector: 'app-local-store-example-template',
  templateUrl: './local-store-example-template.component.html',
  styleUrls: ['././local-store-example-template.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
})
export class LocalStoreExampleTemplateComponent {
  @Input() consultants!: ConsultantLocalModel[];
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
  @Output() consultantAdd = new EventEmitter<ConsultantLocalModel>();
  @Output() pageSelect = new EventEmitter<number>();
  @Output() consultantDelete = new EventEmitter<ConsultantId>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() pageNavigate = new EventEmitter<'previous' | 'next'>();

  searchKey!: string;
  pageNumbers!: { isActive: boolean; value: number }[];
  isNextDisabled!: boolean;
  isPreviousDisabled!: boolean;

  onAddConsultant() {
    this.consultantAdd.emit(this.generateConsultant());
  }

  onPageClick(pageNum: number) {
    this.pageSelect.emit(pageNum);
  }

  onDeleteItem(id: ConsultantId) {
    this.consultantDelete.emit(id);
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

  private generateConsultant(): ConsultantLocalModel {
    const id = (Math.random() + 1).toString(36).substring(10);
    const firstName = (Math.random() + 1).toString(36).substring(7);
    const lastName = (Math.random() + 1).toString(36).substring(7);
    const consultantEmail = `${firstName}_${lastName}@domain.com`;

    return {
      id,
      consultantEmail,
      firstName,
      lastName,
    };
  }
}
