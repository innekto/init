interface IMember {
  name: string;
  internalPosition: string;
  officialPosition: string;
}

export const membersData: IMember[] = [
  {
    name: 'Ірина Головацька',
    internalPosition: 'Голова держуправління Misto ',
    officialPosition: 'CEO',
  },

  {
    name: 'Марія Гусєва',
    internalPosition: 'Керівник сектору цифрових технологій',
    officialPosition: 'Діджитал лід',
  },
  {
    name: 'Катерина Христич',
    internalPosition: 'Спеціалістка з таргетованої реклами',
    officialPosition: 'Таргетолог',
  },
  {
    name: 'Анна Сезон',
    internalPosition: 'Завідувачка сектору благоустрою креативів ',
    officialPosition: 'Дизайнерка',
  },
  {
    name: 'Діана Чепурнова ',
    internalPosition: 'Менеджер з розвитку соціальних мереж ',
    officialPosition: 'CMM-менеджерка',
  },
];
