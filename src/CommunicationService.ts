import ICommunicationService from "./interfaces/ICommunicationService";
import * as express from "express";
import { RequestBody, Entry, Message } from "./models/requestbody";
import IFBMessageParser from "./interfaces/IFBMessageParser";
import Command from "./Command";

export default class CommunicationService implements ICommunicationService {

    constructor(private parser: IFBMessageParser) {

    }

    processRequest(req: express.Request, res: express.Response): void {
        req.body.entry.forEach((entry: Entry) => {
            const message: Message = entry.messaging[0].message;
            if (message) {

                const command: Command = this.parser.parse(message.text);
                

                //check if contains commands
                //yes: parse command
                //no: send help message

                //messageHandler.HandleMessage(sender_psid, webhook_event.message);
            }
        });

    }
}