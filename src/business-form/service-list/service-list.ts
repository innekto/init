import { BadRequestException } from '@nestjs/common';

const services = [
  'таргетована реклама в Instagram та Facebook',
  'реклама в Google',
  'консалтинг',
  'розробка стратегії',
  'інше',
];

export const isValidService = (service: string): boolean => {
  if (!services.includes(service)) {
    throw new BadRequestException(
      `Invalid value of service. Available services: ${services.join(', ')}`,
    );
  }
  return services.includes(service);
};
