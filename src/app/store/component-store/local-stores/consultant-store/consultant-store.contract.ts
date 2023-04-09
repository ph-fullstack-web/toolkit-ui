import { Observable, Subscription } from 'rxjs';
import { ConsultantLocalModel, ListStore, LocalStore } from '@app/store/local';

export interface IConsultantStore extends LocalStore {
  readonly listStore: ListStore<ConsultantLocalModel>;
  readonly consultants$: Observable<ConsultantLocalModel[]>;

  get isLoading$(): Observable<boolean>;

  getConsultant(id: string): Observable<ConsultantLocalModel | undefined>;
  deleteConsultant(id: string): Subscription;
  updateConsultant(id: string, model: Partial<ConsultantLocalModel>): Subscription;
  addConsultant(model: ConsultantLocalModel): Subscription;
}
