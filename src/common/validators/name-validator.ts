import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ name: 'IsValidName', async: true })
export class IsValidName implements ValidatorConstraintInterface {
  validate(name: string) {
    // Регулярний вираз, що дозволяє:
    // - Літери (латиниця або кирилиця)
    // - Апострофи (але не більше одного поспіль в кожній частині)
    // - Дефіси (але не на початку або в кінці)
    // - Пробіли між частинами
    const regex =
      /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ]([A-Za-zА-Яа-яЁёЇїІіЄєҐґ' -]{0,18}[A-Za-zА-Яа-яЁёЇїІіЄєҐґ])?$/;

    // Розбиваємо ім'я на частини по пробілу, щоб перевіряти кожну частину окремо
    const nameParts = name.split(' ');

    // Перевіряємо кожну частину імені за допомогою регулярного виразу
    return nameParts.every((part) => {
      // Перевіряємо, чи немає більше одного дефіса або апострофа підряд
      if (part.includes('--') || part.includes("''")) {
        return false;
      }

      // Перевіряємо кожну частину за регулярним виразом
      return regex.test(part);
    });
  }
}
