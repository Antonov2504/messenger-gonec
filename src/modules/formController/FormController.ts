import type { Validator } from './FormController.types';

export class FormController {
  private validators: Record<string, Validator[]>;
  private values: Record<string, string> = {};
  private errors: Record<string, string> = {};

  private touched: Record<string, boolean> = {};
  private submitted = false;

  constructor(validators: Record<string, Validator[]>) {
    this.validators = validators;
  }

  setValue(name: string, value: string) {
    this.values[name] = value;
  }

  setTouched(name: string) {
    this.touched[name] = true;
  }

  validateField(name: string) {
    const value = this.values[name] ?? '';
    const rules = this.validators[name] ?? [];

    for (const validate of rules) {
      const result = validate(value, { values: this.values });

      if (!result.isValid) {
        this.errors[name] = result.error ?? '';
        return false;
      }
    }

    delete this.errors[name];
    return true;
  }

  validateForm() {
    this.submitted = true;

    return Object.keys(this.validators)
      .map((name) => this.validateField(name))
      .every(Boolean);
  }

  isFormValid() {
    return Object.keys(this.validators).every((name) => !this.errors[name]);
  }

  getError(name: string): string | undefined {
    const shouldShow = this.submitted || this.touched[name];

    if (!shouldShow) {
      return;
    }

    return this.errors[name];
  }

  getValues() {
    return { ...this.values };
  }
}
