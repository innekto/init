import { Desert } from 'src/common/interfaces/deserts';
import { desertType } from 'src/common/types/desertTypes';

export const desertData: Desert[] = [
  {
    type: desertType[0],
    name: 'Макаруни, фісташковий',
    price: 1210,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1703245092/%D1%84%D0%BE%D1%82%D0%BE_pw7fuc.jpg',
    quantity: 24,
    flavor: 'фісташковий',
  },
  {
    type: desertType[0],
    name: 'Макаруни, солона карамель',
    price: 440,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1703245558/%D1%84%D0%BE%D1%82%D0%BE_h0hsrv.jpg',
    quantity: 8,
    flavor: 'солона карамель',
  },
  {
    type: desertType[0],
    name: 'Макаруни, мікс смаків',
    price: 480,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1703245558/%D1%84%D0%BE%D1%82%D0%BE_h0hsrv.jpg',
    composition:
      '2 фісташкових, 2 солона карамель, 3 шоколод-малина, 3 груша-карамель, 2 маскарпоне-шоколад ',
    quantity: 12,
  },
  {
    type: desertType[0],
    name: 'Макаруни, шоколад-малина',
    price: 1700,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1703245961/%D1%84%D0%BE%D1%82%D0%BE_tdvjx0.jpg',
    flavor: 'шоколад-малина',
    quantity: 32,
  },
  {
    type: desertType[0],
    name: 'Макаруни, полуничний',
    price: 440,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1703246064/%D1%84%D0%BE%D1%82%D0%BE_ypvbsh.jpg',
    quantity: 8,
    flavor: 'полуничний',
  },
  {
    type: desertType[0],
    name: 'Макаруни, груша-карамель',
    price: 520,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1703246210/%D1%84%D0%BE%D1%82%D0%BE_jmiybu.jpg',
    flavor: 'груша-карамель',
    quantity: 12,
  },
  {
    type: desertType[0],
    name: 'Макаруни, мікс смаків',
    price: 1300,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1703246515/%D1%84%D0%BE%D1%82%D0%BE_fcs0xo.jpg',
    composition:
      '4 фісташкових, 4 солона карамель, 6 шоколод-малина, 6 груша-карамель, 4 маскарпоне-шоколад ',
    quantity: 24,
  },
  {
    type: desertType[0],
    name: 'Макаруни, маскарпоне-шоколад',
    price: 660,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1703246368/%D1%84%D0%BE%D1%82%D0%BE_xm8rai.jpg',
    flavor: 'маскарпоне-шоколад',
    quantity: 12,
  },

  {
    type: desertType[1],
    name: 'Еклер',
    price: 70,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1700517142/12456.jpg_doupu9.webp',
    weight: 55,
    flavor: 'згущенe молоком',
  },
  {
    type: desertType[1],
    name: 'Еклер',
    price: 70,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1700517142/12456.jpg_doupu9.webp',
    weight: 55,
    flavor: 'Шоколад',
  },
  {
    type: desertType[1],
    name: 'Малиновий десерт',
    price: 160,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1700484092/istockphoto-453490127-612x612_utwzoj.jpg',
    weight: 120,
    composition: 'Бісквіт, сирний крем-мус, малина',
  },
  {
    type: desertType[1],
    name: 'Чізкейк з брусничним джемом',
    price: 160,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1700484410/pexels-photo-4040692_hs7kz2.jpg',
    weight: 120,
    composition: 'Шоколадний бісквіт, сирний мус, брусничний джем',
  },
  {
    type: desertType[1],
    name: 'Тартуфо',
    price: 70,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1700484770/FD2028-e1621503382232_iyujkt.jpg',
    weight: 50,
    composition: 'Фундук, какао, ванільний крем',
  },
  {
    type: desertType[1],
    name: 'Класичний медовик',
    price: 145,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1700485067/istockphoto-1507663204-612x612_usc930.jpg',
    weight: 160,
    composition: 'медові коржі, сметана',
  },

  {
    type: desertType[2],
    name: 'Білий весільний торт',
    price: 3500,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1701337799/%D1%84%D0%BE%D1%82%D0%BE_%D0%BA%D0%BE%D0%BF%D1%96%D1%8F_2_eawc4n.jpg',
    weight: 4000,
    composition: 'начинка на ваш вибір',
    numberOfTiers: 2,
    decor: 'Живі квіти',
  },
  {
    type: desertType[2],
    name: 'Дитячий торт "Котик"',
    price: 1700,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1701337799/%D1%84%D0%BE%D1%82%D0%BE_%D0%BA%D0%BE%D0%BF%D1%96%D1%8F_6_vgqk8i.jpg',
    weight: 2500,
    composition: 'начинка на ваш вибір',
    decor: 'цукрові прикраси',
  },
  {
    type: desertType[2],
    name: 'Дитячий торт',
    price: 1700,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1701337800/%D1%84%D0%BE%D1%82%D0%BE_%D0%BA%D0%BE%D0%BF%D1%96%D1%8F_7_xqlr6i.jpg',
    weight: 2500,
    composition: 'начинка на ваш вибір',
    numberOfTiers: 1,
    decor: 'цукрові прикраси, фрукти, ягоди',
  },
  {
    type: desertType[2],
    name: 'Дитячий торт з макарунами',
    price: 1400,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1701337799/%D1%84%D0%BE%D1%82%D0%BE_zgbo16.jpg',
    weight: 2500,
    composition: 'начинка на ваш вибір',
    numberOfTiers: 1,
    decor: 'макаруни',
  },
  {
    type: desertType[2],
    name: 'Полунично-малиновий торт',
    price: 1400,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1701337799/%D1%84%D0%BE%D1%82%D0%BE_%D0%BA%D0%BE%D0%BF%D1%96%D1%8F_5_wwcs61.jpg',
    weight: 2500,
    flavor: 'Полунично-малинова',
    numberOfTiers: 1,
    decor: 'живі квіти',
  },
  {
    type: desertType[2],
    name: 'Торт "Черрі Гранд"',
    price: 3600,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1701337799/%D1%84%D0%BE%D1%82%D0%BE_%D0%BA%D0%BE%D0%BF%D1%96%D1%8F_4_hiwvzi.jpg',
    weight: 4000,
    flavor: 'вишнева начинка',
    numberOfTiers: 2,
    decor: 'живі квіти',
  },
  {
    type: desertType[2],
    name: 'Шоколадно-чорничний торт',
    price: 760,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1701337799/%D1%84%D0%BE%D1%82%D0%BE_%D0%BA%D0%BE%D0%BF%D1%96%D1%8F_3_pqhmqk.jpg',
    weight: 1000,
    flavor: 'шоколадно-чорнична',
    numberOfTiers: 1,
    decor: 'фрукти, ягоди, шоколадні прикраси',
  },
  {
    type: desertType[2],
    name: 'Весільний торт з живими квітами',
    price: 4000,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1701337799/%D1%84%D0%BE%D1%82%D0%BE_%D0%BA%D0%BE%D0%BF%D1%96%D1%8F_y41iok.jpg',
    weight: 4000,
    composition: 'начинка на ваш вибір',
    numberOfTiers: 3,
    decor: 'живі квіти',
  },

  {
    type: desertType[3],
    name: 'Амстердам',
    price: 350,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1700513752/noroot_bxn525.webp',
    weight: 450,
    composition:
      'Маковий бісквіт з товстим шаром вишневого конфітюру між шарами насиченого сирного крему, шоколадним мусом з маком',
    for: 'для всіх',
    decor: 'цукрові прикраси',
  },
  {
    type: desertType[3],
    name: 'Захер',
    price: 300,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1700513932/__ku5zma.webp',
    weight: 350,
    composition:
      'Шоколадний сметанний бісквіт, просочений коньячним сиропом, апельсиново-абрикосовий конфітюр, шоколадний ганаш, шоколадний декор',
    for: 'для чоловіків',
    decor: 'цукрові прикраси',
  },
  {
    type: desertType[3],
    name: 'Вишня',
    price: 270,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1700514269/Bento-tort-cherry-480x480-562x429_ijmslv.png',
    weight: 350,
    composition:
      'Шоколадний  бісквіт, просочений цукровим сиропом, прошарований кондитерським кремом, натуральний фруктовий наповнювач',
    for: 'для всіх',
    decor: 'фрукти, ягоди',
  },
  {
    type: desertType[3],
    name: 'Серце',
    price: 300,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1700514502/Bento-tort-love-480x480-562x429_rnepk1.png',
    weight: 350,
    composition: 'Шоколадний бісквіт, ванільний крем, апельсинові цукати',
    for: 'для всіх',
    decor: 'цукрові прикраси',
  },
  {
    type: desertType[3],
    name: 'Чізкейк Орео',
    price: 400,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1700515601/202302142051-414-63ebd8179d75a_i8ojlh.webp',
    weight: 350,
    composition:
      'Шоколадно-пісочне тісто, м’який сир, крем на основі маскарпоне з солоною карамеллю та шматочками печива',
    for: 'для всіх',
    decor: 'шоколадні прикраси',
  },
  {
    type: desertType[3],
    name: 'Морквяно-апельсиновий пиріг',
    price: 400,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1700515768/202309111215-565-64fedaacb2da9_pochdr.webp',
    weight: 350,
    composition:
      'Морквяні коржі з корицею, вершковий крем, кисло-солодкий апельсиновий компоте, курага',
    for: 'для всіх',
    decor: 'цукрові прикраси',
  },
  {
    type: desertType[3],
    name: 'На день народження',
    price: 450,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1703523885/%D1%84%D0%BE%D1%82%D0%BE_nc5nig.jpg',
    weight: 500,
    composition: 'начинка на ваш вибір',
    for: 'для всіх',
    decor: 'напис',
  },
  {
    type: desertType[3],
    name: 'На день народження',
    price: 500,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1703525519/%D1%84%D0%BE%D1%82%D0%BE_fay3xm.jpg',
    weight: 500,
    composition: 'начинка на ваш вибір',
    for: 'для всіх',
    decor: 'напис',
  },
  {
    type: desertType[3],
    name: 'На день народження',
    price: 470,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1703525633/%D1%84%D0%BE%D1%82%D0%BE_pbu800.jpg',
    weight: 500,
    composition: 'начинка на ваш вибір',
    for: 'для дітей',
    decor: 'цукрові прикраси',
  },
  {
    type: desertType[3],
    name: 'Дитячий з малюнком',
    price: 400,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1703526312/%D1%84%D0%BE%D1%82%D0%BE_yqgt8n.jpg',
    weight: 500,
    composition: 'начинка на ваш вибір',
    for: 'для дітей',
    decor: 'цукрові прикраси',
  },
  {
    type: desertType[3],
    name: 'З написом',
    price: 440,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1703526455/%D1%84%D0%BE%D1%82%D0%BE_y7u56b.jpg',
    weight: 500,
    composition: 'начинка на ваш вибір',
    for: 'для молодят',
    decor: 'напис',
  },
  {
    type: desertType[3],
    name: 'З написом',
    price: 440,
    imagePath:
      'https://res.cloudinary.com/dmbz99tlq/image/upload/v1703526514/%D1%84%D0%BE%D1%82%D0%BE_swzll3.jpg',
    weight: 500,
    composition: 'начинка на ваш вибір',
    for: 'для всіх',
    decor: 'напис',
  },
];
