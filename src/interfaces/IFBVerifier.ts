import IFBQueryParser from "./IFBQueryParser";
import * as express from 'express';
import IFactory from "./IFactory";

export default interface IFBVerifier{
    verify(req: express.Request):boolean;
}