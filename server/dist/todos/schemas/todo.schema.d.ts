/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
export declare enum TodoStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}
export declare class Todo {
    board_id?: string;
    title: string;
    description: string;
    status?: TodoStatus;
    order_id?: number;
}
export interface StructuredTodos {
    [TodoStatus.TODO]: Todo[];
    [TodoStatus.IN_PROGRESS]: Todo[];
    [TodoStatus.DONE]: Todo[];
}
export declare const TodoSchema: import("mongoose").Schema<Todo, import("mongoose").Model<Todo, any, any, any, import("mongoose").Document<unknown, any, Todo> & Todo & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Todo, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Todo>> & import("mongoose").FlatRecord<Todo> & {
    _id: import("mongoose").Types.ObjectId;
}>;
