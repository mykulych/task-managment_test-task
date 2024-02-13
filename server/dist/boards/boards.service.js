"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const board_schema_1 = require("./schemas/board.schema");
const mongoose = require("mongoose");
let BoardsService = class BoardsService {
    constructor(boardModel) {
        this.boardModel = boardModel;
    }
    async findById(id) {
        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Invalid ID');
        }
        const board = await this.boardModel.findById(id);
        return board;
    }
    async findAll() {
        const boards = await this.boardModel.find();
        return boards;
    }
    async create(board) {
        const exists = await this.boardModel.exists({ name: board.name });
        if (exists) {
            throw new common_1.BadRequestException('Board already exists');
        }
        const res = await this.boardModel.create(board);
        return res;
    }
    async update(id, board) {
        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Invalid ID');
        }
        const exists = await this.boardModel.exists({ name: board.name });
        if (exists) {
            throw new common_1.BadRequestException('Board already exists');
        }
        return await this.boardModel.findByIdAndUpdate(id, board, {
            new: true,
            runValidators: true
        });
    }
    async delete(id) {
        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Invalid ID');
        }
        return await this.boardModel.findByIdAndDelete(id);
    }
};
exports.BoardsService = BoardsService;
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(board_schema_1.Board.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], BoardsService);
//# sourceMappingURL=boards.service.js.map