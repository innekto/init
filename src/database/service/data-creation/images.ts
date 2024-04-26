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

export const whatIsDoneImages: IImages[] = [
  {
    imagePath: '',
    description: '',
  },
  {
    imagePath: '',
    description: '',
  },
];

export const whoWeAreImages: IImages[] = [
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1713696351/%D0%BC%D0%B8_%D0%BF%D1%80%D0%BE%D1%84%D1%96_ghxq3l.jpg',
    description: 'cats',
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1713696351/%D0%BC%D0%B8_%D0%BF%D1%80%D0%B0%D1%86%D1%8E%D1%94%D0%BC%D0%BE_cge3wk.jpg',
    description: 'cat',
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1713696351/%D0%BC%D0%B8_%D0%BA%D1%80%D0%B5%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D1%96_vcjblv.jpg',
    description: 'parrot1',
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1713696351/%D0%86%D0%B7_%D0%BD%D0%B0%D0%BC%D0%B8_%D0%BF%D1%80%D0%BE%D1%81%D1%82%D0%BE_srpupo.jpg',
    description: 'parrot2',
  },
];
