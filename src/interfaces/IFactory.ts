import IFBQueryParser from "./IFBQueryParser";
import IFBVerifier from "./IFBVerifier";
import * as express from 'express';
import IRequestSourceValidator from "./IRequestSourceValidator";
import IFBMessageParser from "./IFBMessageParser";
import Command from "../Command";
import ICommunicationService from "./ICommunicationService";
import CommandWrapper from "../CommandWrapper";
import CommandHandler from "../commandHandlers/CommandHandler";
import { AxiosInstance } from "axios";
import ICoinApi from "./ICoinApi";

export default interface IFactory{
    createFBQueryParser(): IFBQueryParser;
    createFBVerifier(verifyToken: string): IFBVerifier;
    createExpressApp():express.Application;
    createExpressRouter():express.Router;
    createSourceValidator(): IRequestSourceValidator;
    createCommandHandler(messageText: string): CommandHandler;
    createCommunicationService(): ICommunicationService;
    createAxiosInstance(): AxiosInstance;
    createCoinApi(): ICoinApi;
}