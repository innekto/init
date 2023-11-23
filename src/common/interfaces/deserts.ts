import { DesertType } from 'src/common/types/desertTypes';

export interface Desert {
  type: DesertType;
  name: string;
  price: number;
  imagePath: string;
  weight: number;
  composition: string;
}
