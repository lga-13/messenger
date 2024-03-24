import greetings from './field_template.ts';
import Label, { labelBlockType } from './label/label.ts';
import Input, { inputBlockType } from './input/input.ts';
import ErrorMessage, { ErrorMessageBlockType } from './error-message/error-message.ts';
import Block from '../../../components/base/block.ts';
import Link, { LinkBlockType } from '../../../components/link/link.ts';
import Button from '../../../components/button/button.ts';

export interface fieldBlockType {

    // ДАНЫНЕ ЭЛЕМЕНТОВ
    label?: labelBlockType
    input: inputBlockType
    errorMessage?: ErrorMessageBlockType
    link?: LinkBlockType
    validator: (value: string) => boolean

    // ЭЛЕМЕНТЫ
    fieldLabel?: Label | null;
    fieldInput?: Input;
    fieldErrorMessage?: ErrorMessage | null;
    fieldLink?: Link | null;
    fieldToggleButton?: Button;

    settings?: { withInternalID: boolean };
}

export default class Field extends Block {
  constructor(props: fieldBlockType) {
    // Label
    let fieldLabel = null;
    if (props.label) {
      fieldLabel = new Label(props.label);
    }
    props.fieldLabel = fieldLabel;
    // Инпут
    props.input.events = {
      click: () => {
        if (props.fieldErrorMessage) {
          props.fieldErrorMessage.hide();
        }
      },
      blur: () => {
        if (!this.validate()) {
          if (this.props.fieldErrorMessage) {
            this.props.fieldErrorMessage.show();
          }
        }
      },
    };
    props.fieldInput = new Input(props.input);

    // Сообщение ошибки
    let fieldErrorMessage = null;
    if (props.errorMessage) {
      fieldErrorMessage = new ErrorMessage(props.errorMessage);
    }
    props.fieldErrorMessage = fieldErrorMessage;

    // Ссылка
    let fieldLink = null;
    if (props.link) {
      fieldLink = new Link(props.link);
    }
    props.fieldLink = fieldLink;

    if (props.input.inputType === 'password') {
      props.fieldToggleButton = new Button({
        className: 'form-toggle',
        typeName: 'button',
        text: '👁',
        settings: { withInternalID: true },
        events: {
          click: () => { this.togglePasswordVisibility(); },
        },
      });
    }

    props.settings = { withInternalID: true };

    super('div', props);
  }

  private inputValue() {
    return this.children.fieldInput.getInputValue();
  }

  showErrorMessage() {
    if (this.children.fieldErrorMessage) {
      this.children.fieldErrorMessage.show();
    }
  }

  validate(): boolean {
    return this.props.validator(this.inputValue());
  }

  clear() {
    this.children.fieldInput.clear();
  }

  getInputValue() {
    return this.inputValue();
  }

  getName() {
    return this.children.fieldInput.getName();
  }

  // Смена пароля
  togglePasswordVisibility() {
    const passwordInput = this.element.querySelector('input');
    if (passwordInput) {
      const currentType = passwordInput.getAttribute('type');
      const newType = currentType === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', newType);
    }
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
