import { mock, verify, instance, when, deepEqual } from 'ts-mockito';
import { CreateTodoUseCase } from './CreateTodoUseCase';
import { IRepository } from '@clean/details';
import { ITodo } from '../_models/ITodo';
import { ICreateRequester } from '../_ports/ICreateRequester';

describe('CreateTodoUseCase tests', () => {
  const todoRepository = mock<IRepository<ITodo[]>>();
  const createRequester = mock<ICreateRequester>();

  const useCase = new CreateTodoUseCase(
    instance(todoRepository),
    instance(createRequester),
  );

  it('should create item and save to repository', async() => {
    //Given
    const item = {
      title: 'title',
      description: 'description',
    };
    const createdItem = {
      ...item,
      id: 'id',
      checked: false,
      date: 123,
    };

    when(createRequester.create(item)).thenResolve(createdItem);
    when(todoRepository.data).thenReturn([]);

    //When
    await useCase.create(item);

    //Then
    verify(todoRepository.save(deepEqual([createdItem]))).once();
  });
});
