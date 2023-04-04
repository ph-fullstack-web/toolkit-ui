export type Consultant = {
  consultantId: string;
  consultantEmail: string;
  firstName: string;
  lastName: string;
  managerId: string;
};

export type Feedback = {
  feedbackId: string;
  feedbackEmail: string;
  firstName: string;
  lastName: string;
  managerId: string;
};

export type ConsultantReviewer = {
  consultantReviewerId: string;
  consultantEmail: string;
  reviewerEmail: string;
  reviewerName: string;
  reviewerRole: string;
  consultantId: string;
  emailReminderSent: boolean;
};

export type Manager = {
  managerId: string;
  managerEmail: string;
  firstName: string;
  lastName: string;
  consultants?: Consultant[];
};

export type ConsultantsWithReviewer = Consultant & {
  manager: Manager;
  consultantReviewers: ConsultantReviewer[];
};

export type SendEmailToReviewersData = {
  managerId?: string;
  consultantId?: string;
  consultantEmail?: string;
};

export type SendEmailToReviewersResponse = {
  sentDetails: {
    consultantName: string;
    consultantReviewerId: string;
    emailSent: true;
    reviewerEmail: string;
    reviewerName: string;
    sentMessage: string;
  }[];
};
