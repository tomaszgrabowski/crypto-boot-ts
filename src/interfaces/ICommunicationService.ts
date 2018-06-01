import * as express from "express";

export default interface ICommunicationService{
    processRequest(req: express.Request, res: express.Response):void;
}