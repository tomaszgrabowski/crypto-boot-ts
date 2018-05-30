import * as express from "express";
import IFBQueryParser from "./interfaces/IFBQueryParser";
import IFBVerifier from "./interfaces/IFBVerifier";

export default class FBVerifier implements IFBVerifier {

    constructor(private verifyToken: string) {
    }

    verify(req: express.Request, parser: IFBQueryParser):boolean{
        let params = parser.parse(req);
        return params.mode === 'subscribe' && params.token === this.verifyToken;
    }
}




