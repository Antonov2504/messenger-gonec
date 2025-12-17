import { getEnding } from '../utils/string';

// Общие валидаторы
export const requiredValidator =
  (message = 'Обязательное поле') =>
  (value: string) => ({
    isValid: value.trim().length > 0,
    error: message,
  });

export const minLengthValidator = (min: number) => (value: string) => ({
  isValid: value.length >= min,
  error: `Минимум ${min} ${getEnding('символ', min, ['ов', '', 'а'])}`,
});

export const maxLengthValidator = (max: number) => (value: string) => ({
  isValid: value.length <= max,
  error: `Максимум ${max} ${getEnding('символ', max, ['ов', '', 'а'])}`,
});

// Email валидаторы
const EMAIL_ATEXT = "A-Za-z0-9!#$%&'*+/=?^_`{|}~-";
export const emailFormatValidator =
  (
    message = "Некорректный email. Допускаются латинские буквы, цифры и спецсимволы ! # $ % & ' * +  / = ? ^ _ ` { | } ~ -"
  ) =>
  (value: string) => {
    const emailRegex = new RegExp(
      `^[${EMAIL_ATEXT}]+(\\.[${EMAIL_ATEXT}]+)*@` +
        `[A-Za-z0-9]+(-[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})+$`
    );

    return {
      isValid: emailRegex.test(value),
      error: message,
    };
  };

export const emailDomainLettersValidator =
  (message = 'Домен должен заканчиваться буквами') =>
  (value: string) => {
    const emailRegex = new RegExp('^[a-zA-Z]+$');

    const parts = value.split('.');

    if (parts.length < 2) {
      return { isValid: false, error: message };
    }

    const lastPart = parts[parts.length - 1];

    return {
      isValid: emailRegex.test(lastPart),
      error: message,
    };
  };

// Login валидаторы
const LOGIN_CHARSET = 'A-Za-z0-9_-';
const LOGIN_CHARSET_REGEX = new RegExp(`^[${LOGIN_CHARSET}]+$`);
const DIGITS_REGEX = new RegExp('^\\d+$');

export const loginLengthValidator =
  (message = 'Логин должен быть от 3 до 20 символов') =>
  (value: string) => ({
    isValid: value.length >= 3 && value.length <= 20,
    error: message,
  });

export const loginCharsetValidator =
  (message = 'Допустимы только латиница, цифры, "_" и "-"') =>
  (value: string) => ({
    isValid: LOGIN_CHARSET_REGEX.test(value),
    error: message,
  });

export const loginNotOnlyDigitsValidator =
  (message = 'Логин не может состоять только из цифр') =>
  (value: string) => ({
    isValid: !DIGITS_REGEX.test(value),
    error: message,
  });

// Name валидаторы
const NAME_REGEX = new RegExp('^[A-ZА-ЯЁ][a-zа-яё]+(?:-[A-ZА-ЯЁ][a-zа-яё]+)*$');

export const nameValidator =
  (
    message = 'Значение поля должно начинаться с заглавной буквы и содержать только буквы и дефис'
  ) =>
  (value: string) => {
    return {
      isValid: NAME_REGEX.test(value),
      error: message,
    };
  };

// Phone валидаторы
const PHONE_REGEX = new RegExp('^\\+?\\d{10,15}$');

export const phoneValidator =
  (
    message = 'Телефон должен содержать от 10 до 15 цифр и может начинаться с +'
  ) =>
  (value: string) => {
    return {
      isValid: PHONE_REGEX.test(value),
      error: message,
    };
  };

// Password валидаторы
const PASSWORD_LENGTH_REGEX = new RegExp('^.{8,40}$');
const PASSWORD_UPPERCASE_REGEX = new RegExp('[A-ZА-ЯЁ]');
const PASSWORD_DIGIT_REGEX = new RegExp('\\d');

export const passwordLengthValidator =
  (message = 'Пароль должен быть от 8 до 40 символов') =>
  (value: string) => {
    return {
      isValid: PASSWORD_LENGTH_REGEX.test(value),
      error: message,
    };
  };

export const passwordUppercaseValidator =
  (message = 'Пароль должен содержать хотя бы одну заглавную букву') =>
  (value: string) => {
    return {
      isValid: PASSWORD_UPPERCASE_REGEX.test(value),
      error: message,
    };
  };

export const passwordDigitValidator =
  (message = 'Пароль должен содержать хотя бы одну цифру') =>
  (value: string) => {
    return {
      isValid: PASSWORD_DIGIT_REGEX.test(value),
      error: message,
    };
  };

export const passwordRepeatValidator =
  (passwordFieldName = 'password', message = 'Пароли не совпадают') =>
  (value: string, context: { values: Record<string, string> }) => {
    const password = context.values[passwordFieldName];

    return {
      isValid: !password || value === password,
      error: message,
    };
  };
