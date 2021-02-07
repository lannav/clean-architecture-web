import { ITodoCreate } from '../_models/ITodoCreate';
import { ITodo } from '../_models/ITodo';

export interface ICreateRequester {
  create(todo: ITodoCreate): Promise<ITodo>;
}
