import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './schemas/board.schema';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get("/:id")
  async getBoardById(
    @Param("id") id: string
  ): Promise<Board> {
    return this.boardsService.findById(id);
  }

  @Get()
  async getBoards(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Post()
  async createBoard(
    @Body()
    board: CreateBoardDto
  ): Promise<Board> {
    return this.boardsService.create(board);
  }

  @Patch("/:id")
  async updateBoard(
    @Param("id") id: string,
    @Body() board: CreateBoardDto
  ): Promise<Board> {
    return this.boardsService.update(id, board);
  }

  @Delete("/:id")
  async deleteBoard(
    @Param("id") id: string
  ): Promise<Board> {
    return this.boardsService.delete(id);
  } 
}
