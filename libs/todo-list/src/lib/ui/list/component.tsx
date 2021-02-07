import React from 'react';
import { List } from 'antd';
import { TodoItem } from './todo-item';
import { IPropsTodoList } from './types';

export const TodoList: React.FC<IPropsTodoList> = ({ todoListPresenter }) => (
  <List
    bordered
    loading={todoListPresenter.isListLoading}
    dataSource={todoListPresenter.todos}
    renderItem={item => (
      <List.Item>
        <TodoItem {...item} />
      </List.Item>
    )}
  />
)
