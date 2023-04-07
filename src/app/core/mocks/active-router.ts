import { Data, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export class MockActivatedRoute {
  private innerTestParams?: Params;
  private subject: BehaviorSubject<Params> = new BehaviorSubject(this.testParams);
  data?: Observable<Data>;

  params = this.subject.asObservable();
  queryParams = this.subject.asObservable();

  constructor(params?: Params) {
    if (params) {
      this.testParams = params;
    } else {
      this.testParams = {};
    }
  }

  get testParams() {
    return this.innerTestParams as Params;
  }

  set testParams(params: Params) {
    this.innerTestParams = params;
    this.subject.next(params);
  }

  get snapshot() {
    return { params: this.testParams, queryParams: this.testParams };
  }
}
