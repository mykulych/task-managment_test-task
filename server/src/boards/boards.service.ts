import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board } from './schemas/board.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name)
    private boardModel: mongoose.Model<Board>
  ) {}

  async findById(id: string): Promise<Board> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Invalid ID');
    }

    const board = await this.boardModel.findById(id);
    return board;
  }

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

    const exists = await this.boardModel.exists({ name: board.name });
    if (exists) {
      throw new BadRequestException('Board already exists');
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
