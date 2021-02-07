import { IReadRequester } from '../application/_ports/IReadRequester';
import { ICreateRequester } from '../application/_ports/ICreateRequester';
import { IUpdateRequester } from '../application/_ports/IUpdateRequester';
import { IDeleteRequester } from '../application/_ports/IDeleteRequester';
import { IRestClient } from '@clean/details';
import { ITodoCreate } from '../application/_models/ITodoCreate';
import { ITodo } from '../application/_models/ITodo';

export class Requester implements ICreateRequester, IReadRequester, IUpdateRequester, IDeleteRequester {
  constructor(
    private restClient: IRestClient,
  ){}

  create(todo: ITodoCreate): Promise<ITodo> {
    return this.restClient.post('create', todo);
  }

  delete(id: string): Promise<void> {
    return this.restClient.delete(`delete/${id}`);
  }

  read(): Promise<ITodo[]> {
    return this.restClient.get('read');
  }

  update(todo: ITodo): Promise<ITodo> {
    return this.restClient.put('update', todo);
  }

}
