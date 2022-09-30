import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Geodata } from "../entity/Geodata";
import { validate } from 'class-validator';
import { FindOptionsSelect } from "typeorm";

class GeodataController {

    static getAll = async (req:Request, res:Response) => {
        const dataRepository = AppDataSource.getRepository(Geodata);
        let dataarray: Geodata[];
        try{
            let fields = ['id', 'devicename', 'instant', 'positionx', 'positiony'] as FindOptionsSelect<Geodata>;
            dataarray = await dataRepository.find({select:fields});
        }catch{
            return res.status(404).json({message:'Something goes wrong!'});
        }

        if (dataarray.length > 0)
            res.send(dataarray);
        else
            return res.status(404).json({message:'Something goes wrong!'});
    }
    
    static getByDeviceName = async (req:Request, res:Response) => {
        const { devicename } = req.params;
        const dataRepository = AppDataSource.getRepository(Geodata);
        try{
            const dataarray = await dataRepository.find({
                where: { devicename : devicename }
            });
            res.send(dataarray);
        }
        catch(e){
            res.status(404).json({message:'Not result'});
        }
    }

    static newData = async (req:Request, res:Response) => {

        console.log("NEW GEODATA", req.body); 
        let datalist: Geodata[] = [];
        for (let index = 0; index < req.body.length; index++) {
            let data = new Geodata();
            const  { devicename, instant, positionx, positiony } = req.body[index];

            console.log("SAVING GEODATA -> ", data); 

            data.devicename = devicename;
            data.instant = instant;
            data.positionx = positionx;
            data.positiony = positiony;

            //Validate
            const validationOpt = {validationError: {target:false, value:false} }
            const errors = await validate(data, validationOpt);
            if (errors.length > 0)
                return res.status(400).json(errors);

            datalist.push(data);
        }

        const dataRepository = AppDataSource.getRepository(Geodata);
        try{
            await dataRepository.save(datalist);
        }
        catch(error){
            return res.status(409).json({message:'Geodata already exist!'})
        }

        res.status(200).json(datalist);
    }

    static deleteData = async (req:Request, res:Response) => {
        const { devicename } = req.params;
        const dataRepository = AppDataSource.getRepository(Geodata);
        let dataarray: Geodata[];
        try{
            dataarray = await dataRepository.find({
                where: {
                    devicename: devicename,
                },
            }); 
        }
        catch(e){
            return res.status(404).json({ message: 'Data not found' })
        }

        dataRepository.remove(dataarray);
        res.status(201).json({ message: 'Data deleted', numrows: dataarray.length });
    }
}

export default GeodataController;