export type ValidationResult = {
  isValid: boolean;
  error?: string;
};

export type ValidatorContext = {
  values: Record<string, string>;
};

export type Validator = (
  value: string,
  context: ValidatorContext
) => ValidationResult;
