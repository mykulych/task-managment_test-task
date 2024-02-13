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
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const todo_schema_1 = require("./schemas/todo.schema");
const mongoose = require("mongoose");
let TodosService = class TodosService {
    constructor(todoModel) {
        this.todoModel = todoModel;
    }
    async findAll(board_id) {
        const todos = await this.todoModel.find({ board_id }).sort({ order_id: 1 });
        const structuredTodos = {
            [todo_schema_1.TodoStatus.TODO]: [],
            [todo_schema_1.TodoStatus.IN_PROGRESS]: [],
            [todo_schema_1.TodoStatus.DONE]: []
        };
        todos.forEach(todo => structuredTodos[todo.status].push(todo));
        return structuredTodos;
    }
    async create(todo) {
        const isValidBoardId = mongoose.isValidObjectId(todo.board_id);
        if (!isValidBoardId) {
            throw new common_1.BadRequestException('Invalid Board ID');
        }
        const todoCount = await this.todoModel.countDocuments({ board_id: todo.board_id });
        const newTodo = {
            ...todo,
            status: todo_schema_1.TodoStatus.TODO,
            order_id: todoCount + 1
        };
        const res = await this.todoModel.create(newTodo);
        return res;
    }
    async update(id, todo) {
        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Invalid ID');
        }
        return await this.todoModel.findByIdAndUpdate(id, todo, {
            new: true,
            runValidators: true
        });
    }
    async changeStatus(id, status) {
        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Invalid ID');
        }
        return await this.todoModel.findByIdAndUpdate(id, { status }, {
            new: true,
            runValidators: true
        });
    }
    async updateOrder(ids) {
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const isValidId = mongoose.isValidObjectId(id);
            if (!isValidId) {
                throw new common_1.BadRequestException('Invalid ID');
            }
            await this.todoModel.findByIdAndUpdate(id, { order_id: i + 1 }, {
                new: true,
                runValidators: true
            });
        }
    }
    async delete(id) {
        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Invalid ID');
        }
        return await this.todoModel.findByIdAndDelete(id);
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(todo_schema_1.Todo.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], TodosService);
//# sourceMappingURL=todos.service.js.map