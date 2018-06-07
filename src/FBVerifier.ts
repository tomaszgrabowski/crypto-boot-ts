import * as express from "express";
import IFBQueryParser from "./interfaces/IFBQueryParser";
import IFBVerifier from "./interfaces/IFBVerifier";
import IFactory from "./interfaces/IFactory";

export default class FBVerifier implements IFBVerifier {

    constructor(private factory: IFactory, private verifyToken: string) {
    }

    verify(req: express.Request):boolean{
        const parser = this.factory.createFBQueryParser();

        let params = parser.parse(req);
        return params.mode === 'subscribe' && params.token === this.verifyToken;
    }
}




