import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export type Todo = {
  id: string;
  title: string;
};

export type Title = {
  title: string;
};

let todos: Todo[] = [
  // { id: uuid(), title: 'サンプルタスク１' },
  // { id: uuid(), title: 'サンプルタスク２' },
];

@Controller('todos')
export class TodosController {
  @Get()
  findAll(): Todo[] {
    return todos;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Todo {
    // console.log('id', id);
    console.log('todos: ', todos);

    const todo = todos.filter((todo) => todo.id === id);
    console.log('todo:', todo);
    return todo[0];
  }

  @Post()
  addOne(@Body() body: Title) {
    // console.log('title⭐️', title);

    const todo = {
      id: uuid(),
      title: body.title,
    };
    todos.push(todo);
    return todo;
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() body: Title) {
    console.log('id: ', id);
    console.log('body: ', body);
    console.log('todos: ', todos);

    const todo = todos.filter((todo) => todo.id === id);
    console.log('todo:', todo);
    todo[0].title = body.title;
    return todo[0];
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    console.log('id⭐️', id);
    console.log('todos🌟', todos);

    const todo = todos.filter((todo) => todo.id !== id);
    console.log('削除後のtodos: ', todo);
    todos = todo;
    return todos;
  }
}
