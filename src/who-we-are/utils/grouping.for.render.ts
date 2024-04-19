import { WhoWeAre } from '../entities/who-we-are.entity';

export const renderGrouping = (payload: WhoWeAre[]) => {
  const TITLES = [
    'Ми профі',
    'Ми працюємо не з рекламою, а з вашим бізнесом',
    'Ми креативні',
    'Із нами просто',
  ];

  const filteredPayload: WhoWeAre[] = [];

  TITLES.forEach((title) => {
    const filteredItems = payload.filter((item) => item.title === title);
    filteredPayload.push(...filteredItems);
  });

  return filteredPayload;
};
