import { FindOptionsSelect } from 'typeorm';
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { validate } from 'class-validator';
import { Device } from "../entity/Device";

class DeviceController {

    static getAll = async (req:Request, res:Response) => {
        const deviceRepository = AppDataSource.getRepository(Device);
        let devices: Device[];
        try{
            let fields = ['id', 'devicename', 'warningrange', 'cautionrange','alarmrange','type', 'installation'] as FindOptionsSelect<Device>;
            devices = await deviceRepository.find({select:fields});
        }catch{
            return res.status(404).json({message:'Something goes wrong!'});
        }

        if (devices.length >0)
            res.send(devices);
        else
            return res.status(404).json({message:'Something goes wrong!'});
    }

    static getById = async (req:Request, res:Response) => {
        const { id } = req.params;
        const deviceRepository = AppDataSource.getRepository(Device);
        try{
            const device = await deviceRepository.findOneOrFail({
                where: { id : Number(id) }
            });
            res.send(device);
        }
        catch(e){
            res.status(404).json({message:'Not result'});
        }
    }

    static newDevice = async (req:Request, res:Response) => {
        const  { devicename, warningrange, cautionrange, alarmrange, type, installation } = req.body;
        const device = new Device();
        device.devicename = devicename;
        device.warningrange = warningrange;
        device.cautionrange = cautionrange;
        device.alarmrange = alarmrange;
        device.type = type;
        device.installation = installation;

        //Validate
        const validationOpt = {validationError: {target:false, value:false} }
        const errors = await validate(device, validationOpt);
        if (errors.length > 0)
            return res.status(400).json(errors);

        const deviceRepository = AppDataSource.getRepository(Device);
        try{
            await deviceRepository.save(device);
        }
        catch(error){
            return res.status(409).json({message:'device already exist!'})
        }

        res.status(200).json({devicename, type, installation});
    }

    static editDevice = async (req:Request, res:Response) => {
        let device: Device;
        const { id } = req.params;
        const { warningrange, cautionrange, alarmrange, type, installation} = req.body;

        const deviceRepository = AppDataSource.getRepository(Device);
        try{
            device = await deviceRepository.findOneOrFail({
                where: {
                    id: Number(id),
                }
            });
            device.warningrange = warningrange;
            device.cautionrange = cautionrange;
            device.alarmrange = alarmrange;
            device.type = type;
            device.installation = installation
        }
        catch(e){
            return res.status(404).json({message:'Device not found'})
        }

        const validationOpt = { validationError: { target:false, value:false } }
        const errors = await validate(device, validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }

        await deviceRepository.update({ id: Number(id) }, device)
        .then(() => {
            res.status(201).json({ message:'Device update' });
        })
        .catch(err => {
            return res.status(409).json({message:'Something goes wrong -> ' + err})
        });
    }

    static deleteDevice = async (req:Request, res:Response) => {
        const { id } = req.params;
        const deviceRepository = AppDataSource.getRepository(Device);
        let device: Device;
        try{
            device = await deviceRepository.findOneOrFail({
                where: {
                    id: Number(id),
                },
            }); 
        }
        catch(e){
            return res.status(404).json({ message: 'Device not found' })
        }

        deviceRepository.delete(id);
        res.status(201).json({ message: 'Device deleted' });
    }
}

export default DeviceController;