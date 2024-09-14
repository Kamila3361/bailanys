import { Request, Response } from "express";
import { Pet } from "./models/Pet";
import { User } from "../../middlewares/auth-middleware";
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from "../../middlewares/s-3.middlerware";
import UserModel from "../auth/models/User";
import { Event } from "./models/Event";

interface CustomRequest extends Request {
    user?: User;
}

class AllController{
    //getPets
    getPets = async (req: Request, res: Response): Promise<void> => {
        try {
            const pets = await Pet.find().populate('owner').exec();
            res.status(200).json(pets);
        } catch (err) {
            res.status(500).json({ message: 'Error getting all pets' })
        }
    }
    //addPet
    addPet = async (req: Request, res: Response): Promise<void> => {
        try {
            const customReq = req as CustomRequest;
            const userId = customReq.user?.id;
            const user = await UserModel.findById(userId);

            if (!customReq.files?.image) {
                res.status(400).json({ message: "File is required" });
            }
            const fileKey = `${uuidv4()}-${req.body.name}`;
            const uploadParams = {
                bucketName: process.env.AWS_BUCKET_NAME!,
                key: fileKey,
                file: req.files?.image,
                content: 'image/jpeg'
            };

            const posterLocation = await uploadFile(uploadParams);

            const pet = new Pet({
                name: req.body.name,
                type: req.body.type,
                owner: user,
                location: req.body.location,
                image_location: posterLocation.Location,
                description: req.body.description
            });

            await pet.save();
            res.status(201).json(pet);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error adding pet' })
        }
    }

    getEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            const events = await Event.find().populate('owner').exec();
            res.status(200).json(events);
        } catch (err) {
            res.status(500).json({ message: 'Error getting all events' })
        }
    }

    addEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            const customReq = req as CustomRequest;
            const userId = customReq.user?.id;
            const user = await UserModel.findById(userId);

            if (!customReq.files?.image) {
                res.status(400).json({ message: "File is required" });
            }
            const fileKey = `${uuidv4()}-${req.body.name}`;
            const uploadParams = {
                bucketName: process.env.AWS_BUCKET_NAME!,
                key: fileKey,
                file: req.files?.image,
                content: 'image/jpeg'
            };

            const posterLocation = await uploadFile(uploadParams);

            const event = new Event({
                title: req.body.title,
                date: req.body.date,
                location: req.body.location,
                image_location: posterLocation.Location,
                description: req.body.description,
                owner: user
            });

            await event.save();
            res.status(201).json(event);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error adding event' })
        }
    }
}

export default AllController;