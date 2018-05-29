import * as express from 'express';
import FBQueryParams from "./FBQueryParams";
import IFBQueryParser from './interfaces/IFBQueryParser';


export default class FBQueryParser implements IFBQueryParser {
    parse(req: express.Request): FBQueryParams {
        return {
            mode: 'test',
            challenge: 'test',
            token: 'test'
        };
    }
}