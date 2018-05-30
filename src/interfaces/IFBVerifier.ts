import IFBQueryParser from "./IFBQueryParser";
import * as express from 'express';

export default interface IFBVerifier{
    verify(req: express.Request, parser: IFBQueryParser):boolean;
}