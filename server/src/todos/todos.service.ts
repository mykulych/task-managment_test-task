import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StructuredTodos, Todo, TodoStatus } from './schemas/todo.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: mongoose.Model<Todo>
  ) {}

  async findAll(board_id: string): Promise<StructuredTodos> {
    const todos = await this.todoModel.find({ board_id }).sort({ order_id: 1 });
    const structuredTodos = {
      [TodoStatus.TODO]: [],
      [TodoStatus.IN_PROGRESS]: [],
      [TodoStatus.DONE]: []
    };
    todos.forEach(todo => structuredTodos[todo.status].push(todo) )
    return structuredTodos;
  }

  async create(todo: Todo): Promise<Todo> {
    const isValidBoardId = mongoose.isValidObjectId(todo.board_id);
    if (!isValidBoardId) {
      throw new BadRequestException('Invalid Board ID');
    }

    const todoCount = await this.todoModel.countDocuments({ board_id: todo.board_id });
    
    const newTodo = {
      ...todo,
      status: TodoStatus.TODO,
      order_id: todoCount + 1
    }
    
    const res = await this.todoModel.create(newTodo);
    return res;
  }

  async update(id: string, todo: Todo): Promise<Todo> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Invalid ID');
    }
    
    return await this.todoModel.findByIdAndUpdate(id, todo, {
      new: true,
      runValidators: true
    })
  }

  async changeStatus(id: string, status: TodoStatus): Promise<Todo> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Invalid ID');
    }
    
    return await this.todoModel.findByIdAndUpdate(id, {status}, {
      new: true,
      runValidators: true
    })
  }

  async updateOrder(ids: string[]): Promise<void> {
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const isValidId = mongoose.isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Invalid ID');
      }
      
      await this.todoModel.findByIdAndUpdate(id, {order_id: i + 1}, {
        new: true,
        runValidators: true
      });
    }
  }

  async delete(id: string): Promise<Todo> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Invalid ID');
    }
    
    return await this.todoModel.findByIdAndDelete(id);
  }
}
