import React from 'react';
import { Card, Switch, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { IPropsTodoItem } from './types';

export const TodoItem: React.FC<IPropsTodoItem> = ({
  id,
  title,
  description,
  checked,
  todoListPresenter,
}) => {
  const onDeleteCallback = React.useCallback(() => todoListPresenter.delete(id), [todoListPresenter, id]);
  const onCheckCallback = React.useCallback(() => todoListPresenter.onCheck(id), [todoListPresenter, id]);

  return (
    <Card
      title={title}
      extra={todoListPresenter.isItemLoading(id) ? (<Spin />) : (
        <>
          <DeleteOutlined onClick={onDeleteCallback} />
          <Switch
            checkedChildren="undone"
            unCheckedChildren="done"
            checked={checked}
            onChange={onCheckCallback}
          />
        </>
      )}
      style={{ width: 300 }}
    >
      <p>{ description }</p>
    </Card>
  );
};
