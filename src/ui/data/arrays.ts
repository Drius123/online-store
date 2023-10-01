import routeNames from '../../routing/routs';
import armchair from '../../assets/menu-icons/armchair.svg';
import bedroom from '../../assets/menu-icons/bedroom-icon.svg';
import childrensroom from '../../assets/menu-icons/childrensroom-icon.svg';
import closet from '../../assets/menu-icons/closet-icon.svg';
import cupboard from '../../assets/menu-icons/cupboard.svg';
import kitchen from '../../assets/menu-icons/kitchen-icon.svg';
import livingroom from '../../assets/menu-icons/livingroom-icon.svg';
import mattress from '../../assets/menu-icons/mattress.svg';
import novelties from '../../assets/menu-icons/new.svg';
import office from '../../assets/menu-icons/office-icon.svg';
import promotion from '../../assets/menu-icons/promotion-icon.svg';

const linksAndTitles = [routeNames.HOME, 'Главная', routeNames.ABOUTUS, 'О нас', '/contacts', 'Контакты'];

const menuItems = [
  'Кухни',
  'kitchen',
  kitchen,
  'Спальни',
  'bedroom',
  bedroom,
  'Гостинные',
  'livingroom',
  livingroom,
  'Прихожие',
  'closet',
  closet,
  'Офисная мебель',
  'office',
  office,
  'Детская',
  'childrensroom',
  childrensroom,
  'Акция',
  'promotion',
  promotion,
  'Новинки',
  'novelties',
  novelties,
  'Шкафы',
  'cabinets',
  cupboard,
  'Матрасы',
  'Mattresses',
  mattress,
  'Мягкая мебель',
  'Furniture',
  armchair,
];

const footerItems: string[] = [
  'Кухни',
  'kitchen',
  'Спальни',
  'bedroom',
  'Гостинные',
  'livingroom',
  'Прихожие',
  'closet',
  'Офисная мебель',
  'office',
  'Детская',
  'childrensroom',
  'Шкафы',
  'cabinets',
  'Матрасы',
  'Mattresses',
  'Мягкая мебель',
  'Furniture',
];

const countries = [
  {
    text: 'Белоруссия',
    value: 'BY',
  },
  {
    text: 'Россия',
    value: 'RU',
  },
  {
    text: 'Украина',
    value: 'UA',
  },
];

const selectAmount = [
  { text: 1, value: 1 },
  { text: 2, value: 2 },
  { text: 3, value: 3 },
  { text: 4, value: 4 },
  { text: 5, value: 5 },
];

export { linksAndTitles, menuItems, footerItems, countries, selectAmount };
