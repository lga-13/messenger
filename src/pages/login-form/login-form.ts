/* eslint-disable no-console */

import './login-form.css';
import Form from '../../blocks/form/form.ts';
import { ErrorMessages, Validator } from '../../validators/field_validator.ts';
import Block from "../../components/base/block.ts";
import greetings from "../login-form/login_form-template.ts";




export interface LoginFormBlockType {}

class LoginForm extends Block<LoginFormBlockType> {
  constructor(props: LoginFormBlockType) {
    super('div', props);
  }

  addChildren() {
    const loginForm = new Form(
        {
          className: 'login-form',

          title: {
            className: 'login-form-title',
            text: 'Войти',
            tag: 'h2',
            settings: { withInternalID: true },
          },

          button: {
            className: 'login-form-button',
            typeName: 'button',
            text: 'Войти',
            settings: { withInternalID: true },
            events: {
              click: () => {
                if (loginForm.validate()) {
                  const data = loginForm.get_data();
                  console.log(data);
                  loginForm.clear();
                }
              },
            },
          },

          link: {
            className: 'login-form-registration',
            href: '/sign-up',
            text: 'Еще не зарегестрированы?',
            settings: { withInternalID: true },
          },
          fields: [
            {
              label: {
                className: 'login-form-label',
                text: 'Логин',
                settings: { withInternalID: true },
              },
              input: {
                className: 'login-form-input',
                name: 'login',
                placeholder: '',
                inputType: 'text',
                settings: { withInternalID: true },
              },
              errorMessage: {
                className: 'login-form-error-message',
                text: ErrorMessages.validateLogin,
                settings: { withInternalID: true },
              },
              validator: Validator.validateLogin,
            },
            {
              label: {
                className: 'login-form-label',
                text: 'Пароль',
                settings: { withInternalID: true },
              },
              input: {
                className: 'login-form-input',
                name: 'password',
                placeholder: '',
                inputType: 'password',
                settings: { withInternalID: true },
              },
              errorMessage: {
                className: 'login-form-error-message',
                text: ErrorMessages.validatePassword,
                settings: { withInternalID: true },
              },
              validator: Validator.validatePassword,
              link: {
                className: 'login-form-forgot-password',
                href: '#',
                text: 'Забыли пароль?',
              },
            },
          ],
        }
    )
    this.children.loginForm = loginForm
  }

  render() {
    return this.compile(greetings, this.props);
  }
}

export default LoginForm;
