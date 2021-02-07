import { ITodo } from '../_models/ITodo';

export interface IReadRequester {
  read(): Promise<ITodo[]>
}
