import mongoose, {Document, Schema} from "mongoose";

export interface IPet extends Document {
  name: string;
  type: string;
  owner: Schema.Types.ObjectId;
  location: string;
  image_location: string;
  description: string;
}

const PetSchema: Schema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, required: true, ref: "User"},
  location: {type: String, required: true},
  image_location: {type: String, required: true},
  description: {type: String, required: true}
});

export const Pet = mongoose.model<IPet>("Pet", PetSchema);