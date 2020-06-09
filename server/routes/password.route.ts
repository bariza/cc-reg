
import {Request, Response} from 'express';
import {verifyPassword} from '../helpers/helpers';

export function submitPassword(req: Request, res: Response) {

    console.log("Sending password ...", req.body);

    const { password } = req.body;
    const check = verifyPassword(password);

    if (check.result) {
        res.status(200).json({ message : 'Success' });
    }
    else {
        res.status(500).json({ message : check.reason });
    }

}


