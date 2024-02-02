import { Injectable, ExceptionFilter, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board } from './schemas/board.schema';
import mongoose from 'mongoose';
import { BaseExceptionFilter } from '@nestjs/core';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name)
    private boardModel: mongoose.Model<Board>
  ) {}

  async findAll(): Promise<Board[]> {
    const boards = await this.boardModel.find();
    return boards;
  }

  async create(board: Board): Promise<Board> {
    const exists = await this.boardModel.exists({ name: board.name });

    if (exists) {
      throw new BadRequestException('Board already exists');
    }
    
    const res = await this.boardModel.create(board);
    return res;
  }

  async update(id: string, board: Board): Promise<Board> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Invalid ID');
    }
    
    return await this.boardModel.findByIdAndUpdate(id, board, {
      new: true,
      runValidators: true
    })
  }

  async delete(id: string): Promise<Board> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Invalid ID');
    }
    
    return await this.boardModel.findByIdAndDelete(id);
  }
}
