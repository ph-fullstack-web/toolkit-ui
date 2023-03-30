import { Manager } from '@models';
import { mockConsultants } from '@mocks';

export const mockManagers: Manager[] = [
  {
    managerId: 'cba25f38-625e-412e-b303-272f10bc79e9',
    managerEmail: 'ryacobsohn0@alibaba.com',
    firstName: 'Yacobsohn',
    lastName: 'ryacobsohn0@youtube.com',
    consultants: mockConsultants.slice(0, 2),
  },
  {
    managerId: '0fc96dbf-5694-46ca-854c-ae43374058fd',
    managerEmail: 'dtaylor1@51.la',
    firstName: 'Taylor',
    lastName: 'ftaylor1@xing.com',
    consultants: mockConsultants.slice(2, 5),
  },
  {
    managerId: 'ef14a56d-1421-459b-8067-87a5bbbbdab6',
    managerEmail: 'jseide2@gravatar.com',
    firstName: 'Seide',
    lastName: 'gseide2@tripod.com',
    consultants: [],
  },
  {
    managerId: '6f4a05f4-6adf-4955-8bf5-6860c867564d',
    managerEmail: 'drocks3@sciencedaily.com',
    firstName: 'Rocks',
    lastName: 'drocks3@lulu.com',
    consultants: [],
  },
  {
    managerId: '00edaa0d-29d5-4bd6-ae12-ba6935cfac2f',
    managerEmail: 'lbrokenshaw4@aol.com',
    firstName: 'Brokenshaw',
    lastName: 'cbrokenshaw4@facebook.com',
    consultants: [],
  },
];
