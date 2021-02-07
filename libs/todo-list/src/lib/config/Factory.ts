import autoBind from 'auto-bind';
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
    const isLoadingRepositoryCreate = new MobXRepository<boolean>();
    const isLoadingRepositoryRead = new MobXRepository<boolean>();
    const isLoadingRepositoryUpdate = new MobXRepository<Record<string, boolean>>();
    const isLoadingRepositoryDelete = new MobXRepository<Record<string, boolean>>();
    const todosRepository = new MobXRepository<ITodo[]>();
    //^^^repositories

    //use cases
    const createUseCase = new CreateTodoUseCase(
      isLoadingRepositoryCreate,
      todosRepository,
      requester,
    );
    const readUseCase = new ReadTodoUseCase(
      isLoadingRepositoryRead,
      todosRepository,
      requester,
    );
    const updateUseCase = new UpdateTodoUseCase(
      isLoadingRepositoryUpdate,
      todosRepository,
      requester,
    );
    const deleteUseCase = new DeleteTodoUseCase(
      isLoadingRepositoryDelete,
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
    );
    //^^^presenters

    return {
      todoListPresenter: todoListPresenter,
    };
  }
}

export const connector = new Connector<ITodoListUseCases>();
