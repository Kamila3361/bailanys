import mongoose, {Document, Schema} from "mongoose";

export interface IPsychologist extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    image_location: string;
    description: string;
    status: 'active' | 'inactive';
    score: number;
}

const PsychologistSchema: Schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    image_location: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, default: 'active'},
    score: {type: Number, default: 5}
});

export const Psychologist = mongoose.model<IPsychologist>("Psychologist", PsychologistSchema);