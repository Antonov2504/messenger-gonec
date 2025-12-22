import type { Props as BlockProps } from '@/shared/Block';

export type InfoFieldProps = {
  label: string;
  value: string;
};

export type InfoFieldBlockProps = BlockProps & InfoFieldProps;
