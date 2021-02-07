import { TodoList as component } from './component';
import { connector } from '../../config/Factory';

export const TodoList = connector.connect(component, 'todoListPresenter');
