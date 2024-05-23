import { membersData, speakersData } from '.';

interface IImages {
  imagePath: string;
  description: string;
}

export const membersImages: IImages[] = [
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1714989164/1687000960492_sisftc.jpg',
    description: membersData[0].name,
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1714989316/7C199A5C-625F-44B2-918F-A959C068F5B7_sw7w5e.jpg',
    description: membersData[1].name,
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1714989563/1680011977841_wl6gsh.jpg',
    description: membersData[2].name,
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1714989670/1639836410381_yzz1dr.jpg',
    description: membersData[3].name,
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1714989818/2024-05-06_13.03.20_jcmb6d.jpg',
    description: membersData[4].name,
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1714990151/1680280289872_ypjdea.jpg',
    description: membersData[5].name,
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1714992988/2024-05-06_13.49.38_qgxsee.jpg',
    description: membersData[6].name,
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1713726369/kav8vixnuu3rcjkherf0.jpg',
    description: membersData[7].name,
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

export const speakersImages: IImages[] = [
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1715077722/010430722_htentu.jpg',
    description: speakersData[0].name,
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1715077721/055510985_awijyk.jpg',
    description: speakersData[1].name,
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1715077721/yenot_muv2sq.jpg',
    description: speakersData[2].name,
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1715077721/c8bb76d-yenot-1_ht2eg4.jpg',
    description: speakersData[3].name,
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1715077721/Depositphotos_11464248_m-2015_rpprgn.jpg',
    description: speakersData[4].name,
  },
  {
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1715077721/enot11_kvq8pc.jpg',
    description: speakersData[5].name,
  },
];
