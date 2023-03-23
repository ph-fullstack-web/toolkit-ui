import { Component, OnInit } from '@angular/core';

import { ConsultantService, EmailService, ManagerService } from './services';
import { ConsultantsWithReviewer, Manager } from 'src/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading = true;
  isSending = false;
  managerId = '';
  managerList: Manager[] = [];
  rowArr: number[] = [];
  table_data: ConsultantsWithReviewer[] = [];

  constructor(
    private consultantSrvc: ConsultantService,
    private emailSrvc: EmailService,
    private managerSrvc: ManagerService
  ) {}

  ngOnInit() {
    this.fetchManagers();
    this.fetchConsultantsWithReviewer();
  }

  fetchConsultantsWithReviewer() {
    this.rowArr = [];
    this.isLoading = true;

    this.consultantSrvc.getConsultants(this.managerId).subscribe((res) => {
      let rowCount = 0;

      for (const consultant of res) {
        if (consultant.consultantReviewers.length > rowCount) rowCount = consultant.consultantReviewers.length;
      }

      for (let i = 1; i <= rowCount; i++) {
        this.rowArr.push(i);
      }

      this.table_data = res;
      this.isLoading = false;
    });
  }

  fetchManagers() {
    this.managerSrvc.getManagers().subscribe((res) => {
      this.managerList = res.managers;
    });
  }

  onSendEmail() {
    this.isSending = true;
    this.emailSrvc.sendEmailToReviewers({ managerId: this.managerId }).subscribe({
      next: (res) => {
        for (const reviewer of res.sentDetails) {
          const index = this.table_data.findIndex(
            (val) => reviewer.consultantName === `${val.firstName} ${val.lastName}` // Should be consultantId
          );

          this.table_data[index].consultantReviewers.forEach((item) => {
            if (item.consultantReviewerId === reviewer.consultantReviewerId)
              item.emailReminderSent = reviewer.emailSent;
          });
        }

        this.isSending = false;
      },
      error: () => (this.isSending = false),
    });
  }
}
