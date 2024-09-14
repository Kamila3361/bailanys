import mongoose, {Document, Schema} from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  image_location: string;
  owner: Schema.Types.ObjectId;
}

const EventSchema: Schema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: Date, required: true},
  location: {type: String, required: true},
  image_location: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, required: true, ref: "User"}
});

export const Event = mongoose.model<IEvent>("Event", EventSchema);