import * as express from 'express';
import IRequestSourceValidator from './interfaces/IRequestSourceValidator'

export default class RequestSourceValidator implements IRequestSourceValidator {
    validate(req: express.Request): boolean {
        console.log(req.body);
        return req.body.object === 'page';
    }
}