import { ITodoCreate } from './ITodoCreate';

export interface ITodo extends ITodoCreate {
  id: string;
  checked: boolean;
  date: number;
}
