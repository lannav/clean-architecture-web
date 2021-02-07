import { TodoForm as component } from './component';
import { connector } from '../../config/Factory';

export const TodoForm = connector.connect(component, 'todoListPresenter')
