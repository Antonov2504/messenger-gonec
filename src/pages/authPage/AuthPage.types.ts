import type { Link } from '@/components/link';
import type { Form } from '@/modules/form';
import type { Props as BlockProps } from '@/shared/Block';

export type AuthPageMainBlockProps = BlockProps & {
  title: string;
  form: Form;
  link: Link;
};
