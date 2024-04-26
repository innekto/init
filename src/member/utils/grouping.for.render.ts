import { Member } from '../entities/member.entity';

export const teamGrouping = (payload: Member[]) => {
  const INTERNAL_POSITIONS = [
    'Голова держуправління Misto',
    'Спеціалістка з таргетованої реклами',
    'Керівник сектору цифрових технологій',
    'Завідувачка сектору благоустрою креативів',
    'Менеджер з розвитку соціальних мереж',
  ];

  const filteredPayload: Member[] = [];

  INTERNAL_POSITIONS.forEach((ip) => {
    const filteredItems = payload.filter(
      (item) => item.internalPosition === ip,
    );
    filteredPayload.push(...filteredItems);
  });

  return filteredPayload;
};
