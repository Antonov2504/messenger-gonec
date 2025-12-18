export type Endings = {
  0: string;
  1: string;
  2: string;
};

export const getEnding = (word: string, number: number, endings: Endings) => {
  const n = Math.abs(number);
  let index: 0 | 1 | 2 = 0;

  switch (true) {
    case n % 100 >= 5 && n % 100 <= 20:
      index = 0;
      break;
    case n % 10 === 1:
      index = 1;
      break;
    case n % 10 >= 2 && n % 10 <= 4:
      index = 2;
      break;
    default:
      index = 0;
      break;
  }

  return word + endings[index];
};

export const getClassName = (classNames: Array<string | boolean>) => {
  return classNames.filter(Boolean).join(' ');
};
