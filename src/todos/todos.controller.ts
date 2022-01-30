import { Controller, Get } from '@nestjs/common';

export type Todo = {
  id: number;
  title: string;
};

const todos: Todo[] = [
  { id: 1, title: 'サンプルタスク１' },
  { id: 2, title: 'サンプルタスク２' },
];

@Controller('todos')
export class TodosController {
  @Get()
  findAll(): Todo[] {
    return todos;
  }
}
