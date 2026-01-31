import type { Validator } from '@/modules/formController';
import { requiredValidator } from '@/shared/constants/formValidators';

export const addUserFormValidators: Record<string, Validator[]> = {
  login: [requiredValidator()],
};
