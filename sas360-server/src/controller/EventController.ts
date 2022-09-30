import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Event } from "../entity/Event";
import { FindOptionsSelect } from "typeorm";
import { STATE_TYPE } from "../entity/EnumTypes";

class EventController {
    static getAll = async (req:Request, res:Response) => {
        console.log("GET ALL EVENT"); 
        const eventRepository = AppDataSource.getRepository(Event);
        let eventarray: Event[];
        try{
            let fields = ['id', 'devicename', 'instant', 'closedinstant', 'severity', 'info', 'state'] as FindOptionsSelect<Event>;
            eventarray = await eventRepository.find({select:fields});
        }catch{
            return res.status(404).json({message:'Something goes wrong!'});
        }

        if (eventarray.length > 0)
            res.send(eventarray);
        else
            return res.status(404).json({message:'Something goes wrong!'});
    };

    static getByDeviceName = async (req:Request, res:Response) => {
        console.log("GET BY DEVICE NAME ->", req.params); 
        const { devicename } = req.params;
        const eventRepository = AppDataSource.getRepository(Event);
        try{
            const eventarray = await eventRepository.find({
                where: { devicename : devicename }
            });
            res.send(eventarray);
        }
        catch(e){
            res.status(404).json({message:'Not result'});
        }
    };

    static newEvent = async (req:Request, res:Response) => {
        console.log("NEW EVENT -> ", req.body); 
        const  { devicename, instant, severity, info, state } = req.body;
        const event = new Event();
        event.devicename = devicename;
        event.instant = instant;
        event.severity = severity;
        event.info = info;
        event.state = state;

        //Validate
        const validationOpt = {validationError: {target:false, value:false} }
        const errors = await validate(event, validationOpt);
        if (errors.length > 0)
            return res.status(400).json(errors);

        const eventRepository = AppDataSource.getRepository(Event);
        try{
            await eventRepository.save(event);
        }
        catch(error){
            console.log('ERROR ->', error);
            return res.status(409).json({message:'event already exist!'});
        }

        res.status(200).json({ devicename, instant, severity, info, state });
    };

    static editEvent = async (req:Request, res:Response) => {
        console.log("EDIT EVENT -> ", req.params, req.body); 

        let event: Event;
        const { id } = req.params;
        const { state } = req.body;

        const eventRepository = AppDataSource.getRepository(Event);
        try{
            event = await eventRepository.findOneOrFail({
                where: {
                    id: Number(id),
                },
            });
            event.state = state;

            if (state === STATE_TYPE.CLOSED)
                event.closedinstant = new Date();

        }
        catch(e){
            return res.status(404).json({message:'Event not found'})
        }

        //Validate
        const validationOpt = { validationError: { target:false, value:false } }
        const errors = await validate(event, validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }

        //Update
        await eventRepository.update({ id: Number(id) }, event)
        .then(() => {
            res.status(201).json({ message:'Event update' });
        })
        .catch(err => {
            return res.status(409).json({message:`Something goes wrong -> ${err}`})
        });
    };

    static deleteEvent = async (req:Request, res:Response) => {
        console.log("DELETE EVENT -> ", req.params); 
        const { id } = req.params;
        const eventRepository = AppDataSource.getRepository(Event);
        let event: Event;
        try{
            event = await eventRepository.findOneOrFail({
                where: {
                    id: Number(id),
                },
            }); 
        }
        catch(e){
            return res.status(404).json({ message: 'Event not found' })
        }

        eventRepository.delete(id);
        res.status(201).json({ message: 'Event deleted' });

    };
}

export default EventController;