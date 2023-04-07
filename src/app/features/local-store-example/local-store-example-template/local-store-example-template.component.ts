import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

import { ConsultantLocalModel, PaginationMetadata } from '@app/store/local';
import { itemIn } from './local-store-example-template.animations';

export type PageOptions = {
  searchKey: string;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  paginationMetadata: PaginationMetadata;
};

@Component({
  selector: 'app-local-store-example-template',
  templateUrl: './local-store-example-template.component.html',
  styleUrls: ['././local-store-example-template.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  animations: [itemIn(100)],
})
export class LocalStoreExampleTemplateComponent {
  @Input() consultants!: ConsultantLocalModel[];
  @Input() isLoading!: boolean;
  @Input() pageOptions!: PageOptions;

  @Output() consultantAdd = new EventEmitter<ConsultantLocalModel>();
  @Output() pageSelect = new EventEmitter<number>();
  @Output() consultantDelete = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() pageNavigate = new EventEmitter<'previous' | 'next'>();

  pageNumbers!: { isActive: boolean; value: number }[];

  onAddConsultant() {
    this.consultantAdd.emit(this.generateConsultant());
  }

  onPageClick(pageNum: number) {
    this.pageSelect.emit(pageNum);
  }

  onDeleteItem(id: string) {
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
