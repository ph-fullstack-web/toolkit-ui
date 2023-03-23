import { ConsultantsWithReviewer } from 'src/types';
import { mockConsultantReviewers } from './consultantReviewer';
import { mockManagers } from './manager';

export const mockConsultantsWithReviewers: ConsultantsWithReviewer[] = [
  {
    consultantId: 'e23402f5-df8f-4aca-911b-41047d0737e5',
    consultantEmail: 'tmeegin0@istockphoto.com',
    firstName: 'Meegin',
    lastName: 'bmeegin0@unc.edu',
    managerId: 'eed0e9b7-532f-4fb1-86a3-964aed9b8777',
    manager: mockManagers[0],
    consultantReviewers: mockConsultantReviewers,
  },
  {
    consultantId: '04fe2cdf-9c56-4947-9268-20659d49a001',
    consultantEmail: 'dsherrott1@discovery.com',
    firstName: 'Sherrott',
    lastName: 'csherrott1@nytimes.com',
    managerId: '63df56ef-55a5-4b56-92c4-5ca12848a511',
    manager: mockManagers[0],
    consultantReviewers: mockConsultantReviewers,
  },
  {
    consultantId: '102fe2ab-543a-4d72-b3c9-1586ff0236c4',
    consultantEmail: 'ggouldbourn2@quantcast.com',
    firstName: 'Gouldbourn',
    lastName: 'agouldbourn2@paginegialle.it',
    managerId: 'd51f9b87-7697-4959-8376-8a0bb758a7f6',
    manager: mockManagers[1],
    consultantReviewers: [],
  },
  {
    consultantId: '332437c0-269a-45e7-9d85-dcc3ab6136ad',
    consultantEmail: 'bdoblin3@usda.gov',
    firstName: 'Doblin',
    lastName: 'bdoblin3@dailymotion.com',
    managerId: 'a1161d84-7cc6-4fc2-9af4-d53920ff40c6',
    manager: mockManagers[1],
    consultantReviewers: [],
  },
  {
    consultantId: '1518288d-8a05-41b9-bde6-9c79fb88da11',
    consultantEmail: 'dbehan4@senate.gov',
    firstName: 'Behan',
    lastName: 'pbehan4@jimdo.com',
    managerId: '1601ca9b-57f4-4952-8d45-d3825f752e0c',
    manager: mockManagers[1],
    consultantReviewers: [],
  },
];
