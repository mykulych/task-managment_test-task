import { BoardsService } from './boards.service';
import { Board } from './schemas/board.schema';
import { CreateBoardDto } from './dto/create-board.dto';
export declare class BoardsController {
    private boardsService;
    constructor(boardsService: BoardsService);
    getBoardById(id: string): Promise<Board>;
    getBoards(): Promise<Board[]>;
    createBoard(board: CreateBoardDto): Promise<Board>;
    updateBoard(id: string, board: CreateBoardDto): Promise<Board>;
    deleteBoard(id: string): Promise<Board>;
}
