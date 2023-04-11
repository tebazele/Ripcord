import { Schema } from "mongoose";

export const MessageSchema = new Schema({
  body: {type: String, required: true, maxLength: 2000},
  img: {type: String, maxLength: 1000},
  creatorId: {type: Schema.Types.ObjectId, required: true, ref: "Account"},
  channelId: {type: Schema.Types.ObjectId, required: true, ref: "Channel"}
}, { timestamps: true, toJSON: { virtuals: true }})

MessageSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account"
})
