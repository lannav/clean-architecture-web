import { v4 } from 'uuid';
import moment from 'moment';
import { IRestClient } from '@clean/details';
import { ITodo } from '../application/_models/ITodo';

export class MockRestClient implements IRestClient {
  constructor() {}

  private get todos(): ITodo[] {
    return JSON.parse(localStorage.getItem('todos') ?? '[]');
  }

  private set todos(todos: ITodo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  private sleep(ms: number = 1500): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms))
  }

  async delete(url: string): Promise<void> {
    this.todos = this.todos.filter(it => it.id !== url.split('/')[1]);

    await this.sleep();

    return Promise.resolve();
  }

  async get<T>(url: string): Promise<T> {
    await this.sleep();

    return Promise.resolve(this.todos as unknown as T);
  }

  async post<Response, Request = undefined>(url: string, body: Request): Promise<Response> {
    const item = {
      ...body,
      id: v4(),
      checked: false,
      date: Date.now(),
    } as unknown as ITodo;
    this.todos = [...this.todos, item];

    await this.sleep();

    return Promise.resolve(item as unknown as Response);
  }

  async put<Response, Request = undefined>(url: string, body: Request): Promise<Response> {
    this.todos = this.todos.map(it => {
      if (it.id === (body as unknown as ITodo).id) {
        return body as unknown as ITodo;
      } else {
        return it;
      }
    });

    await this.sleep();

    return Promise.resolve(body as unknown as Response);
  }
}
