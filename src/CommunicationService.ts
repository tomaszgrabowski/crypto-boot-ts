import ICommunicationService from "./interfaces/ICommunicationService";
import * as express from "express";
import { RequestBody, Entry, Message } from "./models/requestbody";
import IFBMessageParser from "./interfaces/IFBMessageParser";
import Command from "./Command";
import IFactory from "./interfaces/IFactory";
import { ICommandHandler } from "./interfaces/ICommandHandler";
import CommandWrapper from "./CommandWrapper";


export default class CommunicationService implements ICommunicationService {

    constructor(private factory: IFactory) {

    }

    processRequest(req: express.Request, res: express.Response): void {
        req.body.entry.forEach((entry: Entry) => {
            const message: Message = entry.messaging[0].message;
            const parser = this.factory.createFBMessageParser()
            const command: CommandWrapper = parser.parse(message.text);
            const commmandHandler: ICommandHandler = this.factory.createCommandHandler(command);
            commmandHandler.respond();
        });

    }
}