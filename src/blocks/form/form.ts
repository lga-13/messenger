import Field, { fieldBlockType } from './field/field.ts';
import greetings from './form-template.ts';
import Link, { LinkBlockType } from '../../components/link/link.ts';
import Button, { buttonBlockType } from '../../components/button/button.ts';
import Title, { TitleBlockType } from '../../components/title/title.ts';
import Block from '../../components/base/block.ts';
import { userDataInterface } from '../../pages/settings-page/settings-page.ts';

export interface FormProps {
    className: string,

    // ДАНЫНЕ ЭЛЕМЕНТОВ

    title?: TitleBlockType,

    // Обязательная кнопка
    button: buttonBlockType,

    // Необязательная ссылка под кнопкой
    link?: LinkBlockType

    fields: fieldBlockType[],

    // ЭЛЕМЕНТЫ
    formTitle?: Title | null
    formFields?: Field[]
    formButton?: Button,
    formLink?: Link | null,

    settings?: {withInternalID: boolean}

}

export default class Form extends Block {
  constructor(props: FormProps) {
    // Заголовок формы
    let formTitle = null;
    if (props.title) {
      formTitle = new Title(props.title);
    }
    props.formTitle = formTitle;

    // Поля формы
    const formFields = [];
    Object.values(props.fields).forEach((field) => {
      const currentField = new Field(field);
      formFields.push(currentField);
    });
    props.formFields = formFields;

    // Кнопка
    props.formButton = new Button(props.button);

    // Ссылка формы
    let formLink = null;
    if (props.link) {
      formLink = new Link(props.link);
    }
    props.formLink = formLink;

    props.settings = { withInternalID: true };

    super('div', props);
  }

  // Очистка полей формы
  clear(): void {
    // Ищем поля формы
    Object.values(this.children).forEach((child) => {
      // Проверяем на поля
      if (child instanceof Array && child.every((item) => item instanceof Field)) {
        Object.values(child).forEach((field) => {
          field.clear();
        });
      }
    });
  }

  // Валидация полей формы
  validate(): boolean {
    let verdict = true;
    Object.values(this.children).forEach((child) => {
      if (child instanceof Array && child.every((item) => item instanceof Field)) {
        Object.values(child).forEach((field) => {
          if (!field.validate()) {
            field.showErrorMessage();
            verdict = false;
          }
        });
      }
    });
    return verdict;
  }

  // Метод возвращает даныне всех полей
  get_data(): userDataInterface {
    const currentCondition: userDataInterface = {};

    Object.values(this.children).forEach((child) => {
      if (child instanceof Array && child.every((item) => item instanceof Field)) {
        Object.values(child).forEach((field) => {
          currentCondition[field.getName()] = field.getInputValue();
        });
      }
    });

    return currentCondition;
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
