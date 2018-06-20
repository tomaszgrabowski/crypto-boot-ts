import * as express from 'express';
import IRequestSourceValidator from './interfaces/IRequestSourceValidator'

export default class RequestSourceValidator implements IRequestSourceValidator {
    validate(req: express.Request): boolean {
        console.log(JSON.stringify(req, null, 2));
        return req.body.object === 'page';
    }
}