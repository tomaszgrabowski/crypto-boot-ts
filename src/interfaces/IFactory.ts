import IFBQueryParser from "./IFBQueryParser";
import IFBVerifier from "./IFBVerifier";
import * as express from 'express';
import IRequestSourceValidator from "./IRequestSourceValidator";
import IFBMessageParser from "./IFBMessageParser";
import Command from "../Command";
import { ICommandHandler } from "./ICommandHandler";
import ICommunicationService from "./ICommunicationService";

export default interface IFactory{
    createFBQueryParser(): IFBQueryParser;
    createFBVerifier(verifyToken: string): IFBVerifier;
    createExpressApp():express.Application;
    createExpressRouter():express.Router;
    createSourceValidator(): IRequestSourceValidator;
    createFBMessageParser(): IFBMessageParser;
    createCommandHandler(command: Command): ICommandHandler;
    createCommunicationService(): ICommunicationService;
}