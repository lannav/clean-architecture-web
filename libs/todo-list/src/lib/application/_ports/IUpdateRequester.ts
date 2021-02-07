import { ITodo } from '../_models/ITodo';

export interface IUpdateRequester {
  update(todo: ITodo): Promise<ITodo>
}
