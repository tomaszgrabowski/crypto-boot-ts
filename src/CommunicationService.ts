import ICommunicationService from "./interfaces/ICommunicationService";
import * as express from "express";
import { Entry, Message } from "./models/requestbody";
import IFactory from "./interfaces/IFactory";
import CommandHandler from "./commandHandlers/CommandHandler";


export default class CommunicationService implements ICommunicationService {

    constructor(private factory: IFactory) {

    }

    processRequest(req: express.Request): void {
        req.body.entry.forEach((entry: Entry) => {
            const message: Message = entry.messaging[0].message;
            const senderId: string = entry.messaging[0].sender.id;
            const commmandHandler: CommandHandler = this.factory.createCommandHandler(message.text);
            commmandHandler.respond(senderId, message.text);
        });

    }
}