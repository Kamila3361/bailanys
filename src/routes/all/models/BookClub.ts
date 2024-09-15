import mongoose, {Document, Schema} from "mongoose";

export interface IBookClub extends Document {
  name: string;
  description: string;
  location: string;
  member_count: number;
  image_location: string;
  current_book: string;
  current_book_image: string;
}

const BookClubSchema: Schema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  location: {type: String, required: true},
  member_count: {type: Number, required: true},
  image_location: {type: String, required: true},
  current_book: {type: String, required: true},
  current_book_image: {type: String, required: true}
});

export const BookClub =  mongoose.model<IBookClub>('BookClub', BookClubSchema);