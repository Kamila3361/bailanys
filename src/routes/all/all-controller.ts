import { Request, Response } from "express";
import { Pet } from "./models/Pet";
import { User } from "../../middlewares/auth-middleware";
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from "../../middlewares/s-3.middlerware";
import UserModel from "../auth/models/User";
import { Event } from "./models/Event";
import { Psychologist } from "./models/Psychologist";
import { Mentor } from "./models/Mentor";
import { BookClub } from "./models/BookClub";

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

    getPsychologists = async (req: Request, res: Response): Promise<void> => {
        try {
            const psychologists = await Psychologist.find();
            res.status(200).json(psychologists);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error getting all psychologists' })
        }
    }

    addPsychologist = async (req: Request, res: Response): Promise<void> => {
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

            const psychologist = new Psychologist({
                name: req.body.name,
                email: user?.email,
                phoneNumber: user?.phoneNumber,
                image_location: posterLocation.Location,
                description: req.body.description,
                experience: req.body.experience
            });

            await psychologist.save();
            res.status(201).json(psychologist);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error adding psychologist' })
        }
    }

    ratePsychologist = async (req: Request, res: Response): Promise<void> => {
        try {
            const customReq = req as CustomRequest;
            const {id, rate} = customReq.body;
            
            const psychologist = await Psychologist.findById(id);

            if (!psychologist) {
                res.status(404).json({ message: 'Psychologist not found' });
                return;
            }
            
            psychologist.score = (psychologist.score + Number(rate)) / 2;
            await psychologist.save();
            res.status(200).json(psychologist);
        } catch (err) {
            res.status(500).json({ message: 'Error rating psychologist' })
        }
    }    

    getMentors = async (req: Request, res: Response): Promise<void> => {
        try {
            const mentors = await Mentor.find();
            res.status(200).json(mentors);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error getting all mentors' })
        }
    }

    addMentor = async (req: Request, res: Response): Promise<void> => {
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

            const mentor = new Mentor({
                name: req.body.name,
                email: user?.email,
                phoneNumber: user?.phoneNumber,
                image_location: posterLocation.Location,
                description: req.body.description,
                field: req.body.field
            });

            await mentor.save();
            res.status(201).json(mentor);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error adding psychologist' })
        }
    }

    rateMentor = async (req: Request, res: Response): Promise<void> => {
        try {
            const customReq = req as CustomRequest;
            const {id, rate} = customReq.body;
            
            const mentor = await Mentor.findById(id);

            if (!mentor) {
                res.status(404).json({ message: 'Mentor not found' });
                return;
            }
            
            mentor.score = (mentor.score + Number(rate)) / 2;
            await mentor.save();
            res.status(200).json(mentor);
        } catch (err) {
            res.status(500).json({ message: 'Error rating psychologist' })
        }
    }    

    change = async (req: Request, res: Response): Promise<void> => {
        try{
            const mentors = await Mentor.find();
            for(const mentor of mentors){
                mentor.field = "Mathematics";
                await mentor.save();
            }
            const psychologists = await Psychologist.find();
            for(const psychologist of psychologists){
                psychologist.experience = 5;
                await psychologist.save();
            }
            res.status(200).json({message: "Changed"});
        }catch(err){
            console.log(err)
        }
    }

    getBookClubs = async (req: Request, res: Response): Promise<void> => {
        try {
            const bookClubs = await BookClub.find();
            res.status(200).json(bookClubs);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error getting all book clubs' })
        }
    }

    addBookClub = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.files?.image && !req.files?.bookimage) {
                res.status(400).json({ message: "File is required" });
            }
            const fileKey = `${uuidv4()}-${req.body.name}`;
            const bookImage = `${uuidv4()}-${req.body.current_book}`;

            const uploadParams = {
                bucketName: process.env.AWS_BUCKET_NAME!,
                key: fileKey,
                file: req.files?.image,
                content: 'image/jpeg'
            };

            const uploadParamsBook = {
                bucketName: process.env.AWS_BUCKET_NAME!,
                key: bookImage,
                file: req.files?.bookimage,
                content: 'image/jpeg'
            };

            const posterLocation = await uploadFile(uploadParams);
            const bookImageLocation = await uploadFile(uploadParamsBook);

            const bookClub = new BookClub({
                name: req.body.name,
                description: req.body.description,
                location: req.body.location,
                member_count: req.body.member_count,
                image_location: posterLocation.Location,
                current_book: req.body.current_book,
                current_book_image: bookImageLocation.Location
            });

            await bookClub.save();
            res.status(201).json(bookClub);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error adding book club' })
        }
    }

    getOnlineBookClubs = async (req: Request, res: Response): Promise<void> => {
        try {
            const bookClubs = await BookClub.find({location: 'Online'});
            res.status(200).json(bookClubs);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error getting all book clubs' })
        }
    }

    getOfflineBookClubs = async (req: Request, res: Response): Promise<void> => {
        try {
            //location is not online
            const bookClubs = await BookClub.find({location: {$ne: 'Online'}});
            if (bookClubs.length === 0) {
                res.status(404).json({ message: 'No offline book clubs found' });
            }
            res.status(200).json(bookClubs);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error getting all book clubs' })
        }
    }
}

export default AllController;