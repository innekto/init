import { WhoWeAre } from '../entities/who-we-are.entity';

export const whoWeAreGrouping = (payload: WhoWeAre[]) => {
  const TITLES = [
    'We are professionals',
    'We work not with advertising, but with your business',
    'We are creative',
    'With us it is easy to',
  ];

  const filteredPayload: WhoWeAre[] = [];

  TITLES.forEach((title) => {
    const filteredItems = payload.filter((item) => item.title === title);
    filteredPayload.push(...filteredItems);
  });

  return filteredPayload;
};
