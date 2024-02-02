import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true
})
export class Board {
  @Prop()
  name: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);