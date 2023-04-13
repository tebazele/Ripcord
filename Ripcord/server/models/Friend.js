import { Schema } from "mongoose";

export const FriendsSchema = new Schema({
  isFriend: {type: Boolean, default: false},
  friendId: {type: Schema.Types.ObjectId, required: true, ref: "Account"},
  creatorId: {type: Schema.Types.ObjectId, required: true, ref: "Account"}
}, { timestamps: true, toJSON: { virtuals: true }})

FriendsSchema.virtual("friend", {
  localField: "friendId",
  foreignField: "_id",
  justOne: true,
  ref: "Account"
})
