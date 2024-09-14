import mongoose, {Document, Schema} from "mongoose";

export interface IBookClub extends Document {
  name: string;
  description: string;
  location: string;
  image_location: string;
  owner: Schema.Types.ObjectId;
}

const BookClubSchema: Schema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  location: {type: String, required: true},
  image_location: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, required: true, ref: "User"}
});