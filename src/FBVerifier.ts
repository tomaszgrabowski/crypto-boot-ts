import * as express from "express";
import IFBQueryParser from "./interfaces/IFBQueryParser";

export default class FBVerifier {

    constructor(private req: express.Request, private parser: IFBQueryParser, private verifyToken: string) {
    }

    verify():boolean{
        let params = this.parser.parse(this.req);
        console.log(params.token, this.verifyToken);
        return params.mode === 'subscribe' && params.token === this.verifyToken;
    }
}


