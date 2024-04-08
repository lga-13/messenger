import Block from '../base/block.ts';
import greetings from './plug-template.ts';
import Title from '../title/title.ts';

interface PlugBlockType{
    className: string,
    title: {
        className:string,
        text: string,
        tag: string
    },
    settings?: { withInternalID: true }
}

export default class Plug extends Block<PlugBlockType> {
  declare children: {
      plugLink: Title
  };

  declare props: PlugBlockType;

  constructor(
    props: PlugBlockType,
  ) {
    props.settings = { withInternalID: true };
    super('div', props);
  }

  addChildren() {
    this.children.plugLink = new Title({
      className: this.props.title.className,
      text: this.props.title.text,
      tag: this.props.title.tag,
    });
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
