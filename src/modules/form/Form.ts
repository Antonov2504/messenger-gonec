import { Button } from '@/components/button';
import { Field } from '@/components/field';
import { FormController } from '@/modules/formController';
import { Block } from '@/shared/Block';

import './Form.scss';
import type { FormBlockProps, FormProps } from './Form.types';

export class Form extends Block<FormBlockProps> {
  private controller: FormController | null = null;
  private _initialValues: Record<string, string> = {};
  private _isValid = true;

  constructor({
    id,
    fields,
    submitButton,
    cancelButton,
    validators,
    onSubmit,
    onCancel,
  }: FormProps) {
    super({
      id,
      fields: fields.map(
        (field) =>
          new Field({
            ...field,
            onInput: (name, value) => this._handleInput(name, value),
            onBlur: (name) => this._handleBlur(name),
          })
      ),
      events: {
        submit: (e: Event) => this._handleSubmit(e as SubmitEvent),
      },
      submitButton: new Button(submitButton),
      cancelButton: cancelButton
        ? new Button({
            ...cancelButton,
            onClick: () => {
              this.reset();
              onCancel?.();
            },
          })
        : undefined,
      onSubmit,
    });

    if (validators && Object.keys(validators).length) {
      this._getChildArray<Field>('fields').forEach((field) => {
        const { name, value } = field.input.props;
        this._initialValues[name] = value ?? '';
      });

      this.controller = new FormController(validators, this._initialValues);
    }
  }

  private _handleInput = (name: string, value: string) => {
    if (this.controller) {
      this.controller.setValue(name, value);
      this.controller.validateField(name);

      // Провалилировать password_repeat при обновлении password
      if (name === 'password') {
        this.controller.validateField('password_repeat');
      }
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

  private _handleBlur = (name: string) => {
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

  private _handleSubmit = (e: SubmitEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!this._isValid) {
      return;
    }

    const controller = this.controller;

    if (!controller) {
      const values = this._getChildArray<Field>('fields').reduce<
        Record<string, string>
      >((acc, field) => {
        const { name, value } = field.input.props;
        acc[name] = value ?? '';

        return acc;
      }, {});

      this.props.onSubmit?.(values);
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

  private _reset() {
    this._getChildArray<Field>('fields').forEach((field) => {
      const { name } = field.input.props;

      const initial = this._initialValues[name] ?? '';
      field.input.setProps({ value: initial });
      field.setError(undefined);
    });

    this.controller?.reset(this._initialValues);

    this._updateFormValidity();
  }

  public reset() {
    return this._reset();
  }

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

  public setLoading(isLoading: boolean) {
    const button = this.children.submitButton as Button;

    button.setProps({
      loading: isLoading,
      disabled: isLoading || !this._isValid,
    });
  }

  protected render(): string {
    const { id } = this.props;

    return `
      <form id="${id}" action="#" class="form" autocomplete="off">
        <fieldset class="form__fieldset">
          {{{fields}}}
        </fieldset>

        <div class="form__actions">
          {{{cancelButton}}}
          {{{submitButton}}}
        </div>
      </form>
    `;
  }
}
