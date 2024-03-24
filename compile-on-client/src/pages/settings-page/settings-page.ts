/* eslint-disable no-console */
import './settings-page.css';
import './change-data-form.css';
import './change-password-form.css';
import Block from '../../components/base/block.ts';
import Img from '../../components/img/img.ts';
import Link from '../../components/link/link.ts';
import greetings from './settings-page-template.ts';
import Plug from '../../components/plug/plug.ts';
import Button from '../../components/button/button.ts';
import Form from '../../blocks/form/form.ts';
import avatar from '../../public/static/img/avatar.svg';
import { UserInfoCard } from '../../blocks/user_info_card/user_info_card.ts';
import { ErrorMessages, Validator } from '../../validators/field_validator.ts';
import render from '../../utils/render.ts';

let MOCK_USER_DATA = {
  login: 'admin',
  first_name: 'Глеб',
  second_name: 'Лазарев',
  email: 'admin@admin.ru',
  phone: '+7(999)-999-99-99',
};

export function getUserData() {
  return MOCK_USER_DATA;
}

function setNewUserData(newData) {
  MOCK_USER_DATA = newData;
}

export interface SettingPageBlockType {
    className: string,
    settings?: {withInternalID: boolean},
    settingsImg?: Img,
    settingsLinkImg?: Link,
    userInfoCard?: UserInfoCard
    changeDataForm?: Form,
    changePasswordForm?: Form,
    settingsPlug?: Plug,
    settingsDataLink?: Link,
    settingsPasswordLink?: Link,
    settingsExitLink?: Link,
    buttonBlueBack?: Button
}

export default class SettingsPage extends Block {
  constructor(
    props: SettingPageBlockType,
  ) {
    // Avatar
    props.settingsImg = new Img(
      {
        className: 'settings-img',
        settings: { withInternalID: true },
        srcName: avatar,
        altText: 'photo',
      },
    );

    // Ccылка на смену аватара
    props.settingsLinkImg = new Link(
      {
        className: 'settings-change-img',
        href: '#',
        text: 'Сменить аватар',
        settings: { withInternalID: true },
      },
    );

    // Карточка данных пользователя
    props.userInfoCard = new UserInfoCard({});

    // Форма смены данных пользователя
    props.changeDataForm = new Form(
      {
        className: 'change-data-form',
        button: {
          className: 'change-data-form-button',
          typeName: 'button',
          text: 'Сохранить',
          settings: { withInternalID: true },
          events: {
            click: () => {
              if (props.changeDataForm.validate()) {
                const data = props.changeDataForm.get_data();
                console.log(data);
                setNewUserData(data);
                props.userInfoCard.refreshUserData();
                props.changeDataForm.clear();
              }
            },
          },
        },
        fields: [
          {
            label: {
              className: 'change-data-form-label',
              text: 'Логин',
              settings: { withInternalID: true },
            },
            input: {
              className: 'change-data-form-input',
              name: 'login',
              placeholder: getUserData().login,
              inputType: 'text',
              settings: { withInternalID: true },
              events: {
                click: () => {},
              },
            },
            errorMessage: {
              className: 'change-data-form-error-message',
              text: ErrorMessages.validateLogin,
              settings: { withInternalID: true },
            },
            validator: Validator.validateLogin,
          },
          {
            label: {
              className: 'change-data-form-label',
              text: 'Имя',
              settings: { withInternalID: true },
            },
            input: {
              className: 'change-data-form-input',
              name: 'first_name',
              placeholder: getUserData().first_name,
              inputType: 'text',
              settings: { withInternalID: true },
              events: {
                click: () => {},
              },
            },
            errorMessage: {
              className: 'change-data-form-error-message',
              text: ErrorMessages.validateName,
              settings: { withInternalID: true },
            },
            validator: Validator.validateName,
          },
          {
            label: {
              className: 'change-data-form-label',
              text: 'Фамилия',
              settings: { withInternalID: true },
            },
            input: {
              className: 'change-data-form-input',
              name: 'second_name',
              placeholder: getUserData().second_name,
              inputType: 'text',
              settings: { withInternalID: true },
              events: {
                click: () => {},
              },
            },
            errorMessage: {
              className: 'change-data-form-error-message',
              text: ErrorMessages.validateName,
              settings: { withInternalID: true },
            },
            validator: Validator.validateName,
          },
          {
            label: {
              className: 'change-data-form-label',
              text: 'Почта',
              settings: { withInternalID: true },
            },
            input: {
              className: 'change-data-form-input',
              name: 'email',
              placeholder: getUserData().email,
              inputType: 'email',
              settings: { withInternalID: true },
              events: {
                click: () => {},
              },
            },
            errorMessage: {
              className: 'change-data-form-error-message',
              text: ErrorMessages.validateEmail,
              settings: { withInternalID: true },
            },
            validator: Validator.validateEmail,
          },
          {
            label: {
              className: 'change-data-form-label',
              text: 'Телефон',
              settings: { withInternalID: true },
            },
            input: {
              className: 'change-data-form-input',
              name: 'phone',
              placeholder: getUserData().phone,
              inputType: 'phone',
              settings: { withInternalID: true },
              events: {
                click: () => {},
              },
            },
            errorMessage: {
              className: 'change-data-form-error-message',
              text: ErrorMessages.validateEmail,
              settings: { withInternalID: true },
            },
            validator: Validator.validatePhone,
          },
        ],
      },
    );
    // По умолчанию форма скрыта
    props.changeDataForm.hide();

    // Форма смены пароля
    props.changePasswordForm = new Form(
      {

        className: 'change-password-form',

        button: {
          className: 'change-password-form-button',
          typeName: 'button',
          text: 'Сохранить',
          settings: { withInternalID: true },
          events: {
            click: () => {
              if (props.changePasswordForm.validate()) {
                const data = props.changePasswordForm.get_data();
                console.log(data);
                props.changePasswordForm.clear();
              }
            },
          },
        },

        fields: [
          {
            label: {
              className: 'change-password-form-label',
              text: 'Старый пароль',
              settings: { withInternalID: true },
            },
            input: {
              className: 'change-password-form-input',
              name: 'password',
              placeholder: '',
              inputType: 'password',
              settings: { withInternalID: true },
              events: {
                click: () => {},
              },
            },
            errorMessage: {
              className: 'change-password-form-error-message',
              text: ErrorMessages.validatePassword,
              settings: { withInternalID: true },
            },
            validator: Validator.validatePassword,
          },
          {
            label: {
              className: 'change-password-form-label',
              text: 'Новый пароль',
              settings: { withInternalID: true },
            },
            input: {
              className: 'change-password-form-input',
              name: 'new_password',
              placeholder: '',
              inputType: 'password',
              settings: { withInternalID: true },
              events: {
                click: () => {},
              },
            },
            errorMessage: {
              className: 'change-password-form-error-message',
              text: ErrorMessages.validatePassword,
              settings: { withInternalID: true },
            },
            validator: Validator.validatePassword,
          },
          {
            label: {
              className: 'change-password-form-label',
              text: 'Повторите новый пароль',
              settings: { withInternalID: true },
            },
            input: {
              className: 'change-password-form-input',
              name: 'repeat_password',
              placeholder: '',
              inputType: 'password',
              settings: { withInternalID: true },
              events: {
                click: () => {},
              },
            },
            errorMessage: {
              className: 'change-password-form-error-message',
              text: ErrorMessages.validatePassword,
              settings: { withInternalID: true },
            },
            validator: Validator.validatePassword,
          },
        ],
      },
    );
    // По умолчанию скрыта
    props.changePasswordForm.hide();

    // Заглушка
    props.settingsPlug = new Plug(
      {
        className: 'plug',
        plugLink: {
          className: 'settings-window-link',
          href: '#',
          text: 'Выберите, какие изменения хотите внести.',
        },
      },
    );

    // Ссылка на изменение данных пользователя
    props.settingsDataLink = new Link(
      {
        className: 'settings-change-data',
        href: '#',
        text: 'Изменить личные данные',
        settings: { withInternalID: true },
        events: {
          click: () => {
            this.showChangeDataForm();
          },
        },
      },
    );

    props.settingsPasswordLink = new Link(
      {
        className: 'settings-change-password',
        href: '#',
        text: 'Сменить пароль',
        settings: { withInternalID: true },
        events: {
          click: () => {
            this.showChangePasswordForm();
          },
        },
      },
    );

    props.settingsExitLink = new Link(
      {
        className: 'settings-change-exit',
        href: '/src/pages/login-form/login-form.html',
        text: 'Выйти из аккаунта',
        settings: { withInternalID: true },
      },
    );

    props.buttonBlueBack = new Button(
      {
        className: 'settings-btn-back',
        typeName: 'button',
        text: '',
        settings: { withInternalID: true },
        events: {
          click: () => {
            this.hideSettings();
          },
        },
      },
    );

    super('div', props);
  }

  showChangeDataForm() {
    this.children.changePasswordForm.hide();
    this.children.changeDataForm.show();
    this.children.settingsPlug.hide();
  }

  showChangePasswordForm() {
    this.children.changeDataForm.hide();
    this.children.changePasswordForm.show();
    this.children.settingsPlug.hide();
  }

  hideSettings() {
    this.children.changeDataForm.hide();
    this.children.changePasswordForm.hide();
    this.children.settingsPlug.show();
  }

  render() {
    return this.compile(greetings, this.props);
  }
}

export const settingsPage = new SettingsPage(
  {
    className: 'settings-page',
    settings: { withInternalID: true },
  },
);

render('#app', settingsPage);
