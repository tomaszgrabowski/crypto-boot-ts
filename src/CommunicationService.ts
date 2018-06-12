import ICommunicationService from "./interfaces/ICommunicationService";
import * as express from "express";
import { RequestBody, Entry, Message } from "./models/requestbody";
import IFBMessageParser from "./interfaces/IFBMessageParser";
import Command from "./Command";
import IFactory from "./interfaces/IFactory";
import CommandWrapper from "./CommandWrapper";
import CommandHandler from "./commandHandlers/CommandHandler";


export default class CommunicationService implements ICommunicationService {

    constructor(private factory: IFactory) {

    }

    processRequest(req: express.Request, res: express.Response): void {
        req.body.entry.forEach((entry: Entry) => {
            const message: Message = entry.messaging[0].message;
            const senderId: string = entry.messaging[0].sender.id;
            const parser = this.factory.createFBMessageParser()
            //const command: CommandWrapper = parser.parse(message.text);
            const commmandHandler: CommandHandler = this.factory.createCommandHandler(message.text);
            commmandHandler.respond(senderId, message);
        });

    }
}