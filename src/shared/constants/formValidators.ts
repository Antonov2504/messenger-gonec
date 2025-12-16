import { getEnding } from '../utils/string';

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
