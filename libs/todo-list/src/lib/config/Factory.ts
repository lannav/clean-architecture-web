import { ITodoListUseCases } from './ITodoListUseCases';
import { TodoListPresenter } from '../presenter/todo-list/TodoListPresenter';
import { MobXRepository } from '@clean/details';
import { ITodo } from '../application/_models/ITodo';
import { CreateTodoUseCase } from '../application/create/CreateTodoUseCase';
import { Requester } from '../api/Requester';
import { MockRestClient } from './MockRestClient';
import { ReadTodoUseCase } from '../application/read/ReadTodoUseCase';
import { UpdateTodoUseCase } from '../application/update/UpdateTodoUseCase';
import { DeleteTodoUseCase } from '../application/delete/DeleteTodoUseCase';
import { Connector } from '@clean/details';

export class Factory {
  private static _useCases: ITodoListUseCases;

  static get useCases(): ITodoListUseCases {
    if (this._useCases) {
      return this._useCases;
    }

    this._useCases = new Factory().getUseCases();

    return this._useCases;
  }

  private getUseCases(): ITodoListUseCases {
    const mockRestClient = new MockRestClient();
    const requester = new Requester(mockRestClient);

    //repositories
    const createLoadingRepository = new MobXRepository<boolean>();
    const listLoadingRepository = new MobXRepository<boolean>();
    const itemsLoadingRepository = new MobXRepository<Record<string, boolean>>();
    const todosRepository = new MobXRepository<ITodo[]>();
    //^^^repositories

    //use cases
    const createUseCase = new CreateTodoUseCase(
      todosRepository,
      requester,
    );
    const readUseCase = new ReadTodoUseCase(
      todosRepository,
      requester,
    );
    const updateUseCase = new UpdateTodoUseCase(
      todosRepository,
      requester,
    );
    const deleteUseCase = new DeleteTodoUseCase(
      todosRepository,
      requester,
    );
    //^^^use cases

    //presenters
    const todoListPresenter = new TodoListPresenter(
      todosRepository,
      createUseCase,
      deleteUseCase,
      updateUseCase,
      readUseCase,
      createLoadingRepository,
      listLoadingRepository,
      itemsLoadingRepository,
    );
    //^^^presenters

    return {
      todoListPresenter: todoListPresenter,
    };
  }
}

export const connector = new Connector<ITodoListUseCases>();
