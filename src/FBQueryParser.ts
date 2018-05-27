import * as express from 'express';
import FBQueryParams from "./FBQueryParams";

export default class FBQueryParser {
    parse(req: express.Request): FBQueryParams {
        let params: FBQueryParams = new  FBQueryParams();
        params.mode = req.query['hub.mode'];
        params.challenge = req.query['hub.challenge'];
        params.token = req.query['hub.verify_token'];
        return params;
    }
}