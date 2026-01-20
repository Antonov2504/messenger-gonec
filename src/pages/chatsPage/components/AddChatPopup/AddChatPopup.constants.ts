import type { Validator } from '@/modules/formController';
import {
  chatTitleCharsetValidator,
  maxLengthValidator,
  requiredValidator,
} from '@/shared/constants/formValidators';

export const addChatFormValidators: Record<string, Validator[]> = {
  title: [
    requiredValidator(),
    chatTitleCharsetValidator(),
    maxLengthValidator(250),
  ],
};
