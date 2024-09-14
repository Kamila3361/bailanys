import mongoose, {Document, Schema} from "mongoose";

export interface IMentor extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  image_location: string;
  description: string;
  status: 'active' | 'inactive';
  score: number;
  field: string;
}

const MentorSchema: Schema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  image_location: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, default: 'active'},
  score: {type: Number, default: 5},
  field: {type: String, required: true}
});

export const Mentor = mongoose.model<IMentor>("Mentor", MentorSchema);