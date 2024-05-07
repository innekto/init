interface IEvent {
  name: string;
  date: string;
  location: string;
}

export const eventData: IEvent[] = [
  {
    name: 'Marketing hackathon',
    date: '20.07',
    location: 'Kyiv',
  },
  {
    name: 'Conference "The Future of Marketing"',
    date: '27.07',
    location: 'Kyiv',
  },
  {
    name: 'Marketing party',
    date: '1.08',
    location: 'Kyiv',
  },
  {
    name: 'Webinar "Efficiency of marketing strategies"',
    date: '4.08',
    location: 'Kyiv',
  },
  {
    name: 'Interactive marketing quest',
    date: '11.08',
    location: 'Kyiv',
  },
  {
    name: 'Forum "Innovations in Marketing"',
    date: '18.08',
    location: 'Kyiv',
  },
];
