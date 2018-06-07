import ICommunicationService from "./interfaces/ICommunicationService";
import * as express from "express";
import { RequestBody, Entry, Message } from "./models/requestbody";
import IFBMessageParser from "./interfaces/IFBMessageParser";
import Command from "./Command";
import IFactory from "./interfaces/IFactory";
import { ICommandHandler } from "./interfaces/ICommandHandler";


export default class CommunicationService implements ICommunicationService {
//private parser: IFBMessageParser,
    constructor(private factory: IFactory) {

    }

    processRequest(req: express.Request, res: express.Response): void {
        req.body.entry.forEach((entry: Entry) => {
            const message: Message = entry.messaging[0].message;
            if (message) {
                const parser = this.factory.createFBMessageParser()
                const command: Command = parser.parse(message.text);
                const commmandHandler:ICommandHandler = this.factory.createCommandHandler(command);
                commmandHandler.respond();

                //check if contains commands
                //yes: parse command
                //no: send help message

                //messageHandler.HandleMessage(sender_psid, webhook_event.message);
            }
        });

    }
}