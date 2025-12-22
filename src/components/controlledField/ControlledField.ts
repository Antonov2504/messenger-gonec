import { Block } from '@/shared/Block';
import type { BaseProps } from '@/shared/Block/Block.types';

export abstract class ControlledField<
  P extends BaseProps = BaseProps,
> extends Block<P> {
  protected _value: string = '';

  protected setValue(value: string) {
    if (this._value === value) {
      return;
    }

    this._value = value;
    this.onChangeValue(value);
  }

  protected getValue() {
    return this._value;
  }

  protected resetValue(initial?: string) {
    this._value = initial ?? '';
    this.onChangeValue(this._value);
  }

  protected abstract onChangeValue(value: string): void;
}
