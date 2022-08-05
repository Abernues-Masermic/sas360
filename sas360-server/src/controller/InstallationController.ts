import { FindOptionsSelect } from 'typeorm';
import { Request, Response } from "express"
import { AppDataSource } from "../data-source";
import { Installation } from './../entity/Installation';
import { validate } from 'class-validator';

class InstallationController {

    static getAll = async (req:Request, res:Response) => {
        const installationRepository = AppDataSource.getRepository(Installation);
        let installations: Installation[];
        try{
            let fields = ['id', 'installationname', 'description'] as FindOptionsSelect<Installation>;
            installations = await installationRepository.find({select:fields});
        }catch{
            return res.status(404).json({message:'Something goes wrong!'});
        }

        if (installations.length >0)
            res.send(installations);
        else
            return res.status(404).json({message:'Something goes wrong!'});
    }

    static getById = async (req:Request, res:Response) => {
        const { id } = req.params;
        const installationRepository = AppDataSource.getRepository(Installation);
        try{
            const installation = await installationRepository.findOneOrFail({
                where: { id : Number(id) }
            });
            res.send(installation);
        }
        catch(e){
            res.status(404).json({message:'Not result'});
        }
    }

    static newInstallation = async (req:Request, res:Response) => {
        const  { installationname, description } = req.body;
        const installation = new Installation();
        installation.installationname = installationname;
        installation.description = description;

        //Validate
        const validationOpt = {validationError: {target:false, value:false} }
        const errors = await validate(installation, validationOpt);
        if (errors.length > 0)
            return res.status(400).json(errors);

        const installationRepository = AppDataSource.getRepository(Installation);
        try{
            await installationRepository.save(installation);
        }
        catch(error){
            return res.status(409).json({message:'installation already exist!'})
        }

        res.status(200).json({installationname, description});
    }

    static editInstallation = async (req:Request, res:Response) => {
        let installation: Installation;
        const { id } = req.params;
        const { installationname, description} = req.body;

        const installationRepository = AppDataSource.getRepository(Installation);
        try{
            installation = await installationRepository.findOneOrFail({
                where: {
                    id: Number(id),
                }
            });
            installation.description = description;

        }
        catch(e){
            return res.status(404).json({message:'Installation not found'})
        }

        const validationOpt = { validationError: { target:false, value:false } }
        const errors = await validate(installation, validationOpt);
        if (errors.length > 0){
            return res.status(400).json(errors);
        }

        await installationRepository.update({ id: Number(id) }, installation)
        .then(() => {
            res.status(201).json({ message:'Installation update' });
        })
        .catch(err => {
            return res.status(409).json({message:'Something goes wrong -> ' + err})
        });
    }

    static deleteInstallation = async (req:Request, res:Response) => {
        const { id } = req.params;
        const installationRepository = AppDataSource.getRepository(Installation);
        let installation: Installation;
        try{
            installation = await installationRepository.findOneOrFail({
                where: {
                    id: Number(id),
                },
            }); 
        }
        catch(e){
            return res.status(404).json({ message: 'Installation not found' })
        }

        installationRepository.delete(id);
        res.status(201).json({ message: 'Installation deleted' });
    }
}

export default InstallationController;
