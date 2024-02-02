import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoStatus } from './schemas/todo.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: mongoose.Model<Todo>
  ) {}

  async findAll(board_id: string): Promise<Todo[]> {
    const todos = await this.todoModel.find({ board_id });
    return todos;
  }

  async create(todo: Todo): Promise<Todo> {
    const isValidBoardId = mongoose.isValidObjectId(todo.board_id);
    if (!isValidBoardId) {
      throw new BadRequestException('Invalid Board ID');
    }
    
    const res = await this.todoModel.create({...todo, status: TodoStatus.TODO});
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
  
  async delete(id: string): Promise<Todo> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Invalid ID');
    }
    
    return await this.todoModel.findByIdAndDelete(id);
  }
}
