import { Dispatch, SetStateAction } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { AnyObject, DateSchema, ObjectSchema, StringSchema } from 'yup';

export type { Customer, CustomerWithAddress, Address } from './customer';
export type { Product, ProductInCartAPI, ProductInCart } from './products';

export enum EnumText {
  TITLE_APP_LAYOUT = 'Hello procrastinators',
  TITLE_BUTTON_ADD_CART = 'Добавить в корзину',
  TITLE_BUTTON_PRODUCT_IN_CART = 'Перейти в корзину',
  TITLE_AUTH = 'Авторизируйтесь или пройдите регистрацию',
  TITLE_FORM_AUTH = 'Авторизация',
  TITLE_FORM_REGISTER = 'Регистрация',
  TITLE_INSTAGRAM_LINK = 'INSTAGRAM',
  TITLE_MAIL_LINK = 'mebel_loft_anapa@mail.ru',
  TITLE_TELEPHONE_NUMBER = '8 (964) 89 99 119',
  TITLE_DELIVERY_LINK = 'Доставка',
  TITLE_MENU = 'Меню',
  TITLE_CATEGORIES = 'КАТЕГОРИИ',
  TITLE_FOOTER_PROMOTION = 'Акция',
  TITLE_FOOTER_NEW = 'Новинки',
  TITLE_FOOTER_ADRESSFIRST = 'г. Анапа, Анапское шоссе,',
  TITLE_FOOTER_ADRESSSECOND = '30 Ж/К Черное море',
  TITLE_FOOTER_LOGO = 'LM',
  TITLE_FOOTER_NAV = 'Навигация',

  TEXT_BUTTON_AUTH = 'Войти',
  TEXT_BUTTON_REGISTER_NEXT_STEP = 'Следующий шаг',
  TEXT_BUTTON_REGISTER = 'Зарегистрироваться',

  TEXT_LINK_RETURN_AUTH = 'Если есть учетная запись?',
  TEXT_LINK_RETURN_REGISTER = 'Нет учетной записи?',

  LABEL_LOGIN = 'Логин',
  PLACEHOLDER_LOGIN = 'Введите логин',
  LABEL_PASSWORD = 'Пароль',
  PLACEHOLDER_PASSWORD = 'Введите пароль',
  PLACEHOLDER_OLD_PASSWORD = 'Введите старый пароль',
  PLACEHOLDER_NEW_PASSWORD = 'Введите новый пароль',
  LABEL_REPEAT_PASSWORD = 'Подтвержение пароля',
  PLACEHOLDER_REPEAT_PASSWORD = 'Повторите пароль',
  LABEL_EMAIL = 'E-mail',
  PLACEHOLDER_EMAIL = 'Введите e-mail',
  LABEL_PHONE = 'Телефон',
  PLACEHOLDER_PHONE = 'Введите телефон',
  LABEL_NAME = 'Имя',
  PLACEHOLDER_NAME = 'Введите имя',
  LABEL_LAST_NAME = 'Фамилия',
  PLACEHOLDER_LAST_NAME = 'Введите фамилию',
  LABEL_BIRTHDAY = 'Дата рождения',
  PLACEHOLDER_BIRTHDAY = 'Введите дату рождения',
  LABEL_CITY = 'Город',
  PLACEHOLDER_CITY = 'Введите город',
  LABEL_STREET = 'Улица',
  PLACEHOLDER_STREET = 'Введите улицу',
  LABEL_POST_INDEX = 'Почтовый индекс',
  PLACEHOLDER_POST_INDEX = 'Введите почтовый индекс',
  LABEL_COUNTRY = 'Страна',
  PLACEHOLDER_COUNTRY = 'Введите страну',

  TEXT_TOTAL_PRICE = 'Итоговая стоимость: ',
  TEXT_CHECKOUT = 'Оформить заказ',
  TEXT_DELETE_BAG = 'Очистить корзину',
  TEXT_BAG = 'Ваша корзина',
  TEXT_EMPTY_BAG = 'Ваша корзина пустая. Для перехода на страницу продуктов нажмите на ',
  TEXT_AMOUT_BAG = 'Количество предметов: ',
  TEXT_LINK_PROFILE = 'Профиль',
  TEXT_LINK_EXIT = 'Выйти',
  TEXT_LINK_HOME = 'Главная',
  TEXT_LINK_BAG = '/ Корзина',
  TEXT_LINK_TO_HOME = 'ссылку',
  TEXT_BUTTON_BACK = 'На предыдущий шаг',
  TEXT_BUTTON_NEXT_PAGE = 'На следующую страницу',
  TEXT_BUTTON_PREV_PAGE = 'На предыдущую страницу',
  TEXT_SHOW_PASSWORD = 'Показать пароль',
  TEXT_STORE = 'LOFT МЕБЕЛЬ',
  TEXT_PERFORMANCE = 'Современная и удобная мебель',
  TEXT_BUTTON_CATALOG = 'Смотреть каталог',
  TEXT_PROFILE = 'Личные данные',
  TEXT_PASSWORD = 'Сменить пароль',
  TEXT_BUTTON_CHANGE = 'Изменить',
  TEXT_USER_NAV = 'Главная / Личный кабинет',
  TEXT_USER_SAVE_CHANGE = 'Сохранить изменения',
  TEXT_USER_ADDRESES = 'Управление адресами',
  TEXT_USER_SHIP_ADDRESES = 'Адрес доставки',
  TEXT_USER_BILL_ADDRESES = 'Адрес счета',
  TEXT_BESTSELLERS = 'Хиты продаж',
  TEXT_NOT_PRODUCTS = 'В этой категории товаров нет',
  TEXT_BUTTON_BUY = 'Купить',
  TEXT_FOR_LIKE = 'Добавить в желаемое',
  TEXT_DESCRIPTION = 'Описание:',
  TEXT_SIZES = 'Размер (Д × Ш × В)',
  TEXT_AMOUNT = 'Количество',
  TEXT_CLOSE_MODAL = 'Закрыть окно',
  TEXT_COLOR = 'Цвет',

  FILTER_TEXT_BUTTON = 'Фильтр',
  FILTER_TEXT_TITLE_CAREGORY = 'Раздел',
  FILTER_TEXT_TITLE_PRICE = 'Цена',
  FILTER_TEXT_ALL = 'Все категории',
  FILTER_TEXT_SORT_PRICE = 'Сортировать по цене',
  FILTER_TEXT_SORT_NAME = 'Сортировать по названию',
  FILTER_TEXT_RESET = 'Сброс',

  OUR_TEAM_TEXT = 'Наша команда разработчиков',

  GITHUB = 'GitHub',

  ANDREW_BIOGRAPHY = 'Инженер на атомной станции, стремящийся стать разработчиком, обладающий навыками веб-разработки и имеющий некоторый опыт работы над личными проектами.',
  ANDREY_BIOGRAPHY = 'Студент, стремящийся стать разработчиком, обладающий навыками веб-разработки и имеющий некоторый опыт работы над личными проектами. ',
  VIACHESLAV_BIOGRAPHY = 'IT менеджер в небольших компаниях, обладающий навыками backend (Java, Python) и веб-разработки и имеющий некоторый опыт работы над корпоративными проектами.  ',
  ANDREW_CONTRIBUTION = 'Занимался версткой и проводил тестирование react-компонентов с помощью Jest',
  ANDREY_CONTRIBUTION = 'SOME INF ABOUT CONTRIBUTION ',
  VIACHESLAV_CONTRIBUTION = 'Специализировался на работе с API CommerceTools',
  COLLABORATION_INFORMATION = 'Команда активно взаимодействовала между собой, проводились онлайн-встречи. Задачи распределялись на доске Trello, благодаря чему каждый участник занимался разработкой своей части проекта.',
}

export type InputForm = {
  type: 'text' | 'date' | 'email' | 'number' | 'password' | 'tel';
  title: string;
  placeholder: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  fieldName: string;
  value?: string;
  error?: boolean;
  dataTestId?: string;
  readonly?: boolean;
  profile?: boolean;
};

export type FormType = {
  type?: 'auth' | 'register';
  dataTestId?: string;
};

export type ValueSchema = {
  stringEmpty: StringSchema<string, AnyObject, undefined, ''>;
  firstName: StringSchema<string, AnyObject, undefined, ''>;
  lastName: StringSchema<string, AnyObject, undefined, ''>;
  numbers: StringSchema<string | undefined, AnyObject, undefined, ''>;
  password: StringSchema<string, AnyObject, undefined, ''>;
  email: StringSchema<string, AnyObject, undefined, ''>;
  birthday: DateSchema<Date | undefined, AnyObject, undefined, ''>;
  city: StringSchema<string, AnyObject, undefined, ''>;
  country: StringSchema<string, AnyObject, undefined, ''>;
  postIndex: StringSchema<string, AnyObject, undefined, ''>;
  old_password: StringSchema<string, AnyObject, undefined, ''>;
  new_password: StringSchema<string, AnyObject, undefined, ''>;
};

export type RegisterStepOneValues = {
  password: string;
  email: string;
};

export type RegisterStepTwoValues = {
  lastName: string;
  firstName: string;
};

export type RegisterStepThreeValues = {
  city: string;
  street: string;
  postIndex: string;
  country: string;
};

export type DataForm = RegisterStepOneValues & RegisterStepTwoValues & RegisterStepThreeValues;

export type RegisterStepOneSchema = ObjectSchema<RegisterStepOneValues>;
export type RegisterStepTwoSchema = ObjectSchema<RegisterStepTwoValues>;
export type RegisterStepThreeSchema = ObjectSchema<RegisterStepThreeValues>;

export type HTTPError = {
  status: number;
  data: {
    message: string;
  };
};

export type SelectFormProps = {
  id: string;
  register: UseFormRegister<FieldValues>;
  fieldName: string;
  data: SelectFormItem[];
  error?: boolean;
  value?: string;
  readonly?: boolean;
  profile?: boolean;
  datatestId?: string;
};

interface SelectFormItem {
  text: string;
  value: string;
}

export type BurgerBtnProps = {
  dataTestId?: string;
};

export interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  display?: boolean;
  dataTestId?: string;
  isProductBasket?: boolean;
}

export interface OrderButtonProps extends ButtonProps {
  productId?: string;
}

export type SearchBarProps = {
  dataTestId?: string;
};

export type UserButtonProps = {
  authed: boolean;
  callback: () => void;
  dataTestId?: string;
};

export type MenuProps = {
  burger: boolean;
  dataTestId?: string;
};

export interface RefLink {
  link: string;
  imgLink: string;
  title: string;
  id: string;
  type: 'form' | null;
  dataTestId?: string;
}

export interface UserMenuProps {
  authed: boolean;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  dataTestId?: string;
}

export type HeaderProps = {
  dataTestId?: string;
};

export type FooterProps = {
  dataTestId?: string;
};

export interface HeaderNavProps {
  burger: boolean;
  dataTestId?: string;
}

export interface BurgerMenuProps {
  dataTestId?: string;
}

export type MainProps = {
  children: React.ReactNode;
};

export interface LikeProps {
  children?: React.ReactNode;
}

export type SliderProps = {
  src: string[];
  modalActive: Dispatch<SetStateAction<boolean>>;
  pagination: { clickable: boolean } | boolean;
};

export enum SortOrder {
  asc,
  desc,
}

export interface UserFormProps {
  dataTestId?: string;
}

export interface FilterProps {
  dataTestId?: string;
}

export interface PageProps {
  dataTestId?: string;
}

export interface ProductsProps {
  isHomePage?: boolean;
}
