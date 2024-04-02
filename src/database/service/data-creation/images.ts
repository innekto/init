import { membersData } from './member';

interface IImages {
  imagePath: string;
  description: string;
}

export const membersImages: IImages[] = [
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1712065069/%D0%86%D1%80%D0%B02_1_fgjv6x.jpg',
    description: membersData[0].name,
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1712065070/%D0%9C%D0%B0%D1%88%D0%B02_1_ysxtag.jpg',
    description: membersData[1].name,
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1712065072/IMG_8830_1_wyucvs.jpg',
    description: membersData[2].name,
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1712065068/%D0%90%D0%BD%D1%8F2_1_wzphk1.jpg',
    description: membersData[3].name,
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1712065068/%D0%94%D1%96%D0%B0%D0%BD%D0%B0_%D0%A7%D0%B5%D0%BF%D1%83%D1%80%D0%BD%D0%BE%D0%B2%D0%B0_1_ltrxqr.jpg',
    description: membersData[4].name,
  },
];
