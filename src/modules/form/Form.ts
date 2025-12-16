import { Button } from '@/components/button';
import { Field } from '@/components/field';
import { FormController } from '@/modules/formController';
import { Block } from '@/shared/Block';

import type { FormBlockProps, FormProps } from './Form.types';

export class Form extends Block<FormBlockProps> {
  protected _values: Record<string, string> = {};
  private controller: FormController | null = null;
  private _isValid = true;

  constructor({ id, fields, submitButton, validators, onSubmit }: FormProps) {
    super({
      id,
      fields: fields.map(
        (field) =>
          new Field({
            ...field,
            onInput: (name, value) => this._onInput(name, value),
            onBlur: (name) => this._onBlur(name),
          })
      ),
      submitButton: new Button(submitButton),
      onSubmit,
    });

    if (validators && Object.keys(validators).length) {
      this.controller = new FormController(validators);
    }
  }

  private _onInput = (name: string, value: string) => {
    this._values[name] = value;

    if (this.controller) {
      this.controller.setValue(name, value);
      this.controller.validateField(name);
    }

    // Обновить значение value для инстанса блока Input
    const field = this._getChildArray<Field>('fields').find(
      (field) => field.input.props.name === name
    );

    if (field) {
      field.input.setProps({ value });
    }

    this._updateFormValidity();
  };

  private _onBlur = (name: string) => {
    if (!this.controller) {
      return;
    }

    this.controller.setTouched(name);
    this.controller.validateField(name);
    const error = this.controller.getError(name);

    const field = this._getChildArray<Field>('fields').find(
      (field) => field.input.props.name === name
    );

    if (field) {
      field.setError(error);
    }

    this._updateFormValidity();
  };

  componentDidMount() {
    this.element?.addEventListener('submit', this._handleSubmit);
  }

  componentWillUnmount() {
    this.element?.removeEventListener('submit', this._handleSubmit);
  }

  private _handleSubmit = (e: SubmitEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!this._isValid) {
      return;
    }

    const controller = this.controller;

    if (!controller) {
      this.props.onSubmit?.(this._values);
      return;
    }

    if (!controller.validateForm()) {
      this._getChildArray<Field>('fields').forEach((field) => {
        const name = field.input.props.name;
        field.setError(controller.getError(name));
      });

      this._updateFormValidity();
      return;
    }

    this.props.onSubmit?.(controller.getValues());
  };

  private _updateFormValidity() {
    if (!this.controller) {
      this._isValid = true;
      return;
    }

    this._isValid = this.controller.isFormValid();
    this._updateSubmitButton();
  }

  private _updateSubmitButton() {
    const button = this.children.submitButton as Button;

    button.setProps({ disabled: !this._isValid });
  }

  protected render(): string {
    const { id } = this.props;

    return `
      <form id="${id}" action="#" class="form" autocomplete="off">
        <fieldset class="form__fieldset">
          {{{fields}}}
        </fieldset>

        <div class="form__actions">
          {{{submitButton}}}
        </div>
      </form>
    `;
  }
}
