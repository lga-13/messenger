import Block from '../base/block.ts';
import greetings from './plug-template.ts';
import Link from '../link/link.ts';

export default class Plug extends Block {
  constructor(
    props: {
            className: string,
            plugLink: {
                className:string,
                href: string,
                text: string
            }},
  ) {
    const plugLink = new Link({
      className: props.plugLink.className,
      href: props.plugLink.href,
      settings: { withInternalID: true },
      text: props.plugLink.text,

    });
    props.plugLink = plugLink;

    props.settings = { withInternalID: true };
    super('div', props);
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
