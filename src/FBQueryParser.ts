import * as express from 'express';
import FBQueryParams from "./FBQueryParams";


export default class FBQueryParser {
    parse(req: express.Request): FBQueryParams {
        return {
            mode: 'test',
            challenge: 'test',
            token: 'test'
        };
    }
}