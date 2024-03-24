import greetings from './user_info_card-template.ts';
import Block from '../../components/base/block.ts';
import { getUserData } from '../../pages/settings-page/settings-page.ts';
import Title from '../../components/title/title.ts';

export interface UserInfoCardBlockType{
    cardTitles?: Title[]
}

export class UserInfoCard extends Block {
  constructor(props: UserInfoCardBlockType) {
    props.cardTitles = [];
    Object.values(getUserData()).forEach((title) => {
      props.cardTitles.push(new Title({
        className: 'settings-label',
        text: title,
        settings: { withInternalID: true },
        tag: 'p',
      }));
    });
    // props.cardTitles = UserInfoCard.generateBlock(MOCK_USER_DATA)
    super('div', props);
  }

  static generateBlock(data: {string: string}) {
    const titles = [];
    // Делаем запрос пользователя
    Object.values(data).forEach((titleText) => {
      titles.push(new Title({
        className: 'settings-label',
        text: titleText,
        settings: { withInternalID: true },
        tag: 'p',
      }));
    });
    return titles;
  }

  refreshUserData() {
    this.children.cardTitles = UserInfoCard.generateBlock(getUserData());
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
