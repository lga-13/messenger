import Block from '../base/block.ts';
import greetings from './img-template.ts';

export interface ImgBlockType {
    className: string,
    srcName: string,
    altText: string,
    settings: {withInternalID: boolean}
}

export default class Img extends Block {
  constructor(props: ImgBlockType) {
    super('div', props);
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
