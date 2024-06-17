import { release } from './event.description';

interface IEvent {
  name: string;
  date: string;
  location: string;
  description: string;
}

export const eventData: IEvent[] = [
  {
    name: 'Team Challenge release',
    date: '?.07',
    location: 'Kyiv',
    description: release,
  },
  {
    name: 'Conference "The Future of Marketing"',
    date: '27.07',
    location: 'Kyiv',
    description: '',
  },
  {
    name: 'Marketing party',
    date: '1.08',
    location: 'Kyiv',
    description: '',
  },
  {
    name: 'Webinar "Efficiency of marketing strategies"',
    date: '4.08',
    location: 'Kyiv',
    description: '',
  },
  {
    name: 'Interactive marketing quest',
    date: '11.08',
    location: 'Kyiv',
    description: '',
  },
  {
    name: 'Forum "Innovations in Marketing"',
    date: '18.08',
    location: 'Kyiv',
    description: '',
  },
];
