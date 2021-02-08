import { MessagesList as component } from './component';
import { connector } from '../../config/Factory';

export const MessagesList = connector.connect(component, 'messagesPresenter');
