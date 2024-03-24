import Block from '../base/block.ts';
import greetings from './button_template.ts';

export interface buttonBlockType {
    className: string,
    typeName: string,
    text: string,
    settings?: {withInternalID: boolean},
    events?: {
        click?: (events) => void,
        keydown?: (event) => void
    },
}

export default class Button extends Block {
  constructor(props: buttonBlockType) {
    // Создаём враппер DOM-элемент button
    super('div', props);
  }

  componentDidMount() {
    this.element.querySelector('button').focus();
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
