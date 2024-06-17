import { Department } from './departments';

interface IMember {
  name: string;
  position: string;
  department: Department;
}

export const membersData: IMember[] = [
  {
    name: 'Viktoriia Semeniuk',
    position: 'Project Manager',
    department: Department.Project,
  },

  {
    name: 'Virchenko Vladyslav',
    position: 'Backend developer',
    department: Department.Backend,
  },
  {
    name: 'Antonina Kharybina',
    position: 'QA Engineer',
    department: Department.QA,
  },
  {
    name: 'Oleksandr Petrechko',
    position: 'Frontend developer',
    department: Department.Frontend,
  },
  {
    name: 'Ivan Barei',
    position: 'Frontend developer',
    department: Department.Frontend,
  },
  {
    name: 'Serafim Barey',
    position: 'Mentor Frontend Developer',
    department: Department.Frontend,
  },
  {
    name: 'Yuliia Petrovska',
    position: 'QA Engineer',
    department: Department.QA,
  },
  {
    name: 'Tihon Simak',
    position: 'Mentor Ux/Ui Designer',
    department: Department.Designer,
  },
  {
    name: 'Iryna Zatynina',
    position: 'Frontend developer',
    department: Department.Frontend,
  },
  {
    name: 'Botvina Karina',
    position: 'UX/Ui Designer',
    department: Department.Designer,
  },
];
