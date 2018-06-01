import IFBQueryParser from "./IFBQueryParser";
import IFBVerifier from "./IFBVerifier";
import * as express from 'express';
import IRequestSourceValidator from "./IRequestSourceValidator";

export default interface IFactory{
    createFBQueryParser(): IFBQueryParser;
    createFBVerifier(verifyToken: string): IFBVerifier;
    createExpressApp():express.Application;
    createExpressRouter():express.Router;
    createSourceValidator(): IRequestSourceValidator;
}