export type ValidationResult = {
  isValid: boolean;
  error?: string;
};

export type Validator = (value: string) => ValidationResult;
