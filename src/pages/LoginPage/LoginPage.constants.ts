import type { Validator } from '@/modules/formController';
import { requiredValidator } from '@/shared/constants/formValidators';

export const loginFormValidators: Record<string, Validator[]> = {
  login: [requiredValidator()],
  password: [requiredValidator()],
};
