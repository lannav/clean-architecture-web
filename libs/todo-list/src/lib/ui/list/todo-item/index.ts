import { TodoItem as component } from './component';
import { connector } from '../../../config/Factory';

export const TodoItem = connector.connect(component, 'todoListPresenter');
