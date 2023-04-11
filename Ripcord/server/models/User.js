import { Schema } from "mongoose";

export const UserSchema = new Schema({
  creatorId: {type: Schema.Types.ObjectId, required: true, ref: "Account"},
  channelId: {type: Schema.Types.ObjectId, required: true, ref: "Channel"}
}, { timestamps: true, toJSON: { virtuals: true }})

UserSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  ref: "Account",
  justOne: true
}),

UserSchema.virtual("channel", {
  localField: "channelId",
  foreignField: "_id",
  justOne: true,
  ref: "Channel"
})
