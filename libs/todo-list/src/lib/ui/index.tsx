import React from 'react';
import { connector, Factory } from '../config/Factory';
import { TodoForm } from './form';
import { TodoList as List } from './list';

export const TodoList: React.FC = () => (
  <connector.Provider useCases={Factory.useCases}>
    <TodoForm />
    <List />
  </connector.Provider>
);
