import { BadRequestException } from '@nestjs/common';

const services = [
  'Targeted advertising on Instagram and Facebook',
  'Advertising on Google',
  'Consulting',
  'Strategy development',
  'Other',
];

export const isValidService = (service: string): boolean => {
  if (!services.includes(service)) {
    throw new BadRequestException(
      `Invalid value of service. Available services: ${services.join(', ')}`,
    );
  }
  return services.includes(service);
};
